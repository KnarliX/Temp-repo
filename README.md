# Arnyt Backend — Senior Engineer Analysis

> Analyzed by: Senior Backend Engineer Review  
> Stack: Node.js 22 · TypeScript · uWebSockets.js · PostgreSQL · Valkey (Redis)  
> Version: 0.1.0 (MVP)

---

## 1. Project Overview

Arnyt is a **privacy-first peer-to-peer messaging backend** built for an Android app (React Native + Expo). The architecture is deliberately minimal by design: the server acts as a **signaling layer**, never as a message router. All actual message content is transmitted directly between client devices over WebRTC data channels.

The backend serves three roles:

- **Identity & Auth** — ECDSA/Ed25519 challenge-response authentication; short-lived JWTs for session continuity
- **WebRTC Signaling** — WebSocket relay of session initiation, offer/answer/ICE exchange, and key rotation messages
- **Encrypted Fallback Store** — Temporary encrypted message storage for offline-recipient delivery, with a hard 6-hour cleanup cycle

The tech stack is deliberately lean and high-performance: `uWebSockets.js` is one of the fastest Node.js networking libraries available (outperforms Fastify/Express by 2–5× on raw throughput), PostgreSQL handles durable state, and Valkey (Redis-compatible) handles ephemeral presence and rate limiting.

**Current state:** MVP quality — the core plumbing is solid, but several production-critical pieces are stubs or TODOs (FCM push, signature verification, session routing).

---

## 2. Folder Structure Explanation

```
backend/
├── migrations/                     # Ordered SQL migration files
│   ├── 001_create_users.sql
│   ├── 002_create_devices.sql
│   ├── 003_create_sessions.sql
│   ├── 004_create_fallback_messages.sql
│   ├── 005_create_push_tokens.sql
│   └── 006_create_session_state_transitions.sql
│
├── src/
│   ├── index.ts                    # Entry point — app bootstrap & graceful shutdown
│   │
│   ├── config/
│   │   └── env.ts                  # Typed env config with validation & defaults
│   │
│   ├── db/
│   │   ├── client.ts               # PostgreSQL pool singleton
│   │   └── migrate.ts              # Migration runner (reads /migrations/*.sql)
│   │
│   ├── cache/
│   │   ├── client.ts               # Valkey/ioredis singleton
│   │   └── outbox.ts               # Redis outbox buffer + ACK tracking logic
│   │
│   ├── routes/                     # HTTP REST handlers (uWS app.post/get/del)
│   │   ├── auth.ts                 # POST /v1/auth/token
│   │   ├── fallback.ts             # GET/POST/DELETE /v1/messages/fallback
│   │   ├── push.ts                 # POST /v1/push/register
│   │   └── turn.ts                 # POST /v1/turn/credentials
│   │
│   ├── ws/                         # WebSocket layer
│   │   ├── server.ts               # WS handler, message dispatch, relay logic
│   │   ├── auth.ts                 # JWT issue/verify + clock-skew check
│   │   ├── presence.ts             # Valkey presence (online/offline/busy)
│   │   └── rateLimit.ts            # Sliding-window rate limiter (sorted sets)
│   │
│   ├── middleware/                  # HTTP middleware
│   │   ├── authGuard.ts            # Bearer JWT extractor/verifier
│   │   ├── bodyParser.ts           # JSON body reader with size cap
│   │   ├── cors.ts                 # CORS headers + OPTIONS handler
│   │   └── rateLimitRest.ts        # REST rate limit wrapper (uses ws/rateLimit)
│   │
│   ├── services/                   # Background/external services
│   │   ├── cron.ts                 # Periodic cleanup job (6h cycle)
│   │   ├── logger.ts               # Structured logger (pino-style)
│   │   ├── push.ts                 # FCM push notification stub
│   │   └── turn.ts                 # TURN credential issuer (HMAC-SHA1 time-limited)
│   │
│   ├── errors/
│   │   └── codes.ts                # Typed error code constants + human labels
│   │
│   └── types/
│       └── protocol.ts             # Shared TypeScript interfaces for all WS/REST shapes
│
└── tests/
    ├── bodyParser.test.ts
    └── outbox.test.ts
```

The folder layout is **logical and clean for its size**. It separates transport concerns (routes, ws) from infrastructure (db, cache) from business logic (services). This is essentially a well-structured monolith, appropriate for MVP scale.

---

## 3. API Endpoint Table

### REST Endpoints

| Method | Path | Auth | Rate Limit | Description |
|--------|------|------|------------|-------------|
| `POST` | `/v1/auth/token` | None (public) | 10 req/60s per IP | Issue JWT via ECDSA challenge-response. Registers new device if `identity_pub` is provided |
| `POST` | `/v1/messages/fallback` | Bearer JWT | 30 req/60s per user | Upload encrypted fallback message for offline recipient |
| `GET` | `/v1/messages/fallback` | Bearer JWT | 60 req/60s per user | Fetch all pending fallback messages (drain Redis then DB) |
| `DELETE` | `/v1/messages/fallback/:storage_id` | Bearer JWT | — | Mark a fallback message as received (soft delete, cron hard-deletes) |
| `POST` | `/v1/push/register` | Bearer JWT | 5 req/60s per device | Register or update FCM token for a device |
| `POST` | `/v1/turn/credentials` | Bearer JWT | 10 req/60s per user | Issue time-limited TURN server credentials (HMAC-SHA1) |
| `GET` | `/health` | None | — | Health check — returns `{status: "ok", ts: timestamp}` |
| `OPTIONS` | `/*` | None | — | CORS preflight handler |

### WebSocket Messages (`/ws`)

| Direction | Type | Auth Required | Description |
|-----------|------|---------------|-------------|
| Client → Server | `auth:init` | No | Authenticate WS connection using JWT |
| Server → Client | `auth:ok` | — | Auth success confirmation |
| Server → Client | `auth:error` | — | Auth failure |
| Client → Server | `presence:pong` | Yes | Heartbeat response to server ping |
| Client → Server | `presence:update` | Yes | Set presence state (`online`/`offline`/`busy`) |
| Server → Client | `presence:ping` | — | Server heartbeat (every 25s) |
| Client → Server | `session:initiate` | Yes | Start a new WebRTC session with a peer |
| Client → Server | `session:accept` | Yes | Accept an incoming session |
| Client → Server | `session:reject` | Yes | Reject an incoming session |
| Client → Server | `session:cancel` | Yes | Cancel an in-progress session |
| Client → Server | `webrtc:offer` | Yes | Forward WebRTC SDP offer to peer |
| Client → Server | `webrtc:answer` | Yes | Forward WebRTC SDP answer to peer |
| Client → Server | `webrtc:ice` | Yes | Forward ICE candidate to peer |
| Client → Server | `control:key-rotate` | Yes | Signal key rotation to peer |
| Server → Client | `error` | — | Generic error with code + message |

---

## 4. Data Flow

### Auth Flow
```
Client                          Server                        PostgreSQL
  │                               │                               │
  ├─ POST /v1/auth/token ─────────►                               │
  │  {user_id, device_id,         │                               │
  │   auth_proof, timestamp,      │──── SELECT devices ──────────►│
  │   identity_pub?}              │◄─── device row or empty ──────┤
  │                               │                               │
  │                               │  [New device]                 │
  │                               │──── INSERT users/devices ────►│
  │                               │                               │
  │                               │──── UPDATE last_seen_at ─────►│
  │◄─ {token, expires_in} ────────│                               │
```

### WebSocket Signaling Flow
```
Device A                       Server                          Device B
  │                              │                               │
  ├─ WS /ws ─────────────────────►                               │
  ├─ auth:init {token} ──────────►                               │
  │◄─ auth:ok ────────────────────┤  setPresence(A, 'online')   │
  │                               │                               │
  ├─ session:initiate ────────────►                               │
  │  {to_user_id, session_id,     ├─── relay to Device B ───────►│
  │   a_ephemeral_pub, mode}      │                               │
  │                               │◄── session:accept ────────── ┤
  │◄─── relay to Device A ────────┤    {b_ephemeral_pub}         │
  │                               │                               │
  ├─ webrtc:offer ────────────────►                               │
  │                               ├─── relay ──────────────────► │
  │◄────────────────── webrtc:answer ─────────────────────────── ┤
  │◄────────────────── webrtc:ice ────────────────────────────── ┤
  │                               │                               │
  │◄══════════ Direct P2P WebRTC Connection Established ═════════►│
```

### Fallback Message Flow
```
Sender                         Server             Redis         PostgreSQL
  │                              │                  │               │
  ├─ POST /v1/messages/fallback ─►                  │               │
  │  {encrypted_payload}         │                  │               │
  │                              │  Is sender WS    │               │
  │                              │  active?         │               │
  │                              │──── YES ──────── ►               │
  │                              │  rpush outbox:{recipient}        │
  │                              │                  │               │
  │◄─ 201 {storage_id} ──────────│                  │               │
  │                              │  [On WS close or cron]           │
  │                              │  flushOutboxToDB │               │
  │                              │──────────────────────────────── ►│
  │                              │                  │               │
Recipient ─ GET /v1/messages/fallback ──────────────►               │
  │         1. drainOutbox(Redis)│                  │               │
  │         2. SELECT DB rows    │                  │────────────── ►│
  │◄─ 200 [messages] ────────────│                  │               │
  │                              │                  │               │
  ├─ DELETE /fallback/:id ───────►                  │               │
  │                              │──── UPDATE is_received=true ───►│
  │◄─ 200 {deleted: true} ───────│  [Cron deletes confirmed rows]  │
```

---

## 5. Database Schema Explanation

### `users`
The root identity table. Intentionally minimal — only `id` (UUID), `created_at`, and a `status` flag (`active`/`blocked`). No usernames, emails, or phone numbers are stored. This aligns with the privacy-by-design philosophy.

### `devices`
Each user can have multiple devices. Stores the `identity_pub` (X25519 public key as BYTEA) which is the cryptographic anchor for the challenge-response auth. Has a `last_seen_at` timestamp for activity tracking. Indexed on `user_id` for O(log n) lookups.

### `sessions`
Tracks WebRTC session lifecycle (`pending` → `active` → `closed`/`failed`). References both `initiator_device_id` and `receiver_device_id`. Contains `mode` (`strict` or `hybrid`) controlling whether fallback is allowed. Indexed on receiver+state for fast accept/reject lookups and on state for the cleanup cron.

### `fallback_messages`
The most security-critical table. Stores **encrypted** payloads only — the server never sees plaintext. Key fields: `ciphertext` (BYTEA), `nonce` (BYTEA), `header_mac` (BYTEA). `storage_id` is the server-assigned retrieval key; `msg_id` is the client-assigned idempotency key (unique index). The `is_received` flag drives soft-delete; the cron handles hard deletion. Hard cap of 32,768 bytes per message enforced at DB level via a CHECK constraint.

### `push_tokens`
One FCM token per device (`device_id` is both the PK and a FK to `devices`). Uses upsert to keep tokens fresh. Cascades delete on device removal.

### `session_state_transitions`
An append-only audit log for session state changes. Uses `BIGINT GENERATED ALWAYS AS IDENTITY` for efficient insertion without UUID overhead. The `actor` column records whether the transition was device-driven or system-driven.

**Index strategy is good overall** — composite indexes on hot paths (`recipient_device_id + is_received + created_at` for fallback fetch, `receiver_device_id + state` for session accept) show awareness of query patterns.

---

## 6. Security Issues

### Critical

**1. `auth_proof` signature is never verified.**
The authentication endpoint reads `auth_proof` from the request but does not actually verify the ECDSA/Ed25519 signature against `identity_pub`. Any client can currently authenticate as any registered device by sending the correct `user_id` and `device_id` — the cryptographic proof is ignored. This is the most severe gap in the codebase.

```typescript
// auth.ts — there is no call to crypto.verify() anywhere
const { user_id, device_id, auth_proof, timestamp, identity_pub } = body;
// auth_proof is accepted but never actually validated ← CRITICAL BUG
```

**2. Self-registration is open with no rate limiting on device creation.**
Any client can register a new `user_id` and `device_id` in the same request. The only rate limit applied is on the IP (`10 req/60s`). A single IP using rotation could enumerate and register thousands of fake users. There is no email/phone verification, invite code, or account approval flow.

**3. JWT secret has no minimum entropy enforcement.**
`validateEnv()` only checks that `JWT_SECRET` is non-empty. A secret like `"a"` would pass and produce trivially forgeable tokens. A minimum of 32 bytes of cryptographic randomness should be enforced.

### High

**4. Session relay has no membership verification.**
In `ws/server.ts`, relay messages (`session:accept`, `webrtc:offer`, etc.) are forwarded to the first connected device that isn't the sender — with no check that the target device is actually a member of the referenced session. Any authenticated user can inject messages into any active session.

**5. `CORS_ORIGINS` defaults to wildcard `"*"`.**
The `.env.example` and default config allow all origins. For a production API serving authenticated endpoints, this should be a strict allowlist.

**6. Fallback dedup check is a TOCTOU race condition.**
The `POST /v1/messages/fallback` endpoint does a `SELECT` to check for duplicate `msg_id` then a separate `INSERT`. Under concurrent load, two requests with the same `msg_id` can both pass the SELECT and both attempt an INSERT. The DB unique index will catch the second INSERT and throw a 500, not a graceful 409.

### Medium

**7. `identity_pub` is stored as raw BYTEA but never validated for key format/length.**
A client can register a device with a malformed or zero-length public key, which would cause issues if verification logic is added later without input sanitization.

**8. TURN credential `username` encodes the `userId` in plaintext.**
The format `${expiry}:${userId}` exposes user identity to the TURN server operator. Consider hashing or using a session-scoped identifier instead.

**9. FCM push service is a stub.**
`services/push.ts` logs intent but never sends notifications. Offline users will never be woken up, making the fallback storage flow incomplete end-to-end.

**10. No request payload validation library.**
Field presence is checked manually in every route handler. There's no schema validation (e.g., zod or ajv), meaning type coercion, unexpected fields, and malformed UUIDs are not caught consistently.

---

## 7. Performance Improvements

**1. Eliminate N+1 ACK checks in `checkAllAcked`.**
The current implementation calls `SISMEMBER` in a loop for each `msgId`. Replace with a single `SMEMBERS` or use `SINTERCARD` / a Lua script to check set membership in one round trip.

**2. Use `INSERT ... ON CONFLICT` for dedup instead of SELECT-then-INSERT.**
The fallback message dedup should be a single upsert:
```sql
INSERT INTO fallback_messages (...) VALUES (...)
ON CONFLICT (msg_id) DO NOTHING
RETURNING storage_id;
```
If `RETURNING` returns nothing, the `msg_id` already existed — respond 409. This eliminates the race condition and the extra DB round trip.

**3. Batch `flushOutboxToDB` with a single multi-row INSERT.**
Currently the flush loop executes one `INSERT` per message inside a transaction. For large outboxes this is slow. Build a single parameterized multi-row INSERT:
```sql
INSERT INTO fallback_messages (...) VALUES ($1,$2,...), ($9,$10,...), ... ON CONFLICT DO NOTHING
```

**4. Avoid `pool.query()` hot-path overhead in `getPool()`.**
`getPool()` is called on every request. While it returns a cached singleton, the async function call has overhead. Store the pool reference after first init and call it synchronously via a module-level variable.

**5. The `flushAllOutboxes` SCAN loop uses `COUNT 100` which may under-scan on dense keyspaces.**
Under high load with many outbox keys, cursor-based iteration with COUNT 100 may take many round trips. Consider a higher COUNT (500–1000) for the shutdown/startup flush.

**6. Rate limiter pipeline result parsing is fragile.**
`results[2]?.[1]` to get the `ZCARD` result will silently allow requests if the pipeline response structure changes. Parse with explicit index validation or use a typed pipeline helper.

**7. WebSocket message dispatch uses a linear string comparison chain.**
The `message` handler checks `type` with a series of `if` statements and then `RELAY_TYPES.has(type)`. For scalability, replace with a `Map<string, handler>` lookup table — `O(1)` dispatch and cleaner code.

---

## 8. Future Scalability Suggestions

**1. Horizontal scaling requires removing in-process state.**
`deviceSockets` is a `Map` in process memory. If you run two server instances, a message relay from Device A (on server 1) to Device B (on server 2) will fail — Device B won't be found. To scale horizontally, replace the in-process Map with a Redis pub/sub or Redis Streams–based relay:
- Server 1 publishes `{type, payload, to_device_id}` to a Redis channel
- All servers subscribe and forward if they hold that device's socket

**2. Migrate from cron-based cleanup to Postgres `pg_partman` or time-series TTL.**
As message volume grows, `DELETE FROM fallback_messages WHERE is_received = true` will become a full table scan or a slow index scan with lock contention. Partition `fallback_messages` by `created_at` (daily or hourly partitions) so cleanup is a fast `DROP TABLE` on old partitions.

**3. Add a session-to-device routing index.**
The WS relay currently iterates `deviceSockets` O(n) to find peers by `userId` or `sessionId`. Maintain two additional Maps: `userSockets: Map<userId, Set<deviceId>>` and `sessionParties: Map<sessionId, [deviceId, deviceId]>` for O(1) routing.

**4. Consider NATS JetStream or Redis Streams for signaling reliability.**
WebSocket messages are fire-and-forget. If a relay fails (backpressure drop, race on disconnect), the signal is lost. A lightweight message queue for signaling messages would give at-least-once delivery guarantees.

**5. Add connection pooling metrics and circuit breakers.**
At scale, both Postgres and Valkey connections can become bottlenecks. Instrument pool utilization (`pg.Pool.totalCount`, `waitingCount`) and add circuit breaker logic to shed load gracefully.

**6. Multi-device per user is architecturally supported but not fully implemented.**
The `session:initiate` TODO notes that resolving `to_user_id` → `device_id` for multi-device users needs a DB lookup. Design a device selection policy (most recently seen, all devices, user-chosen active device) and implement it before multi-device launch.

---

## 9. Better Folder / File Structure Suggestion

The current structure is good for MVP but will become hard to navigate as features grow. Here is a suggested structure that scales better and separates concerns more clearly:

```
backend/
├── src/
│   │
│   ├── core/                        # Infrastructure layer (no business logic)
│   │   ├── db/
│   │   │   ├── pool.ts              # pg Pool singleton
│   │   │   └── migrate.ts
│   │   ├── cache/
│   │   │   ├── client.ts            # ioredis singleton
│   │   │   └── scripts/             # Lua scripts as .lua files (not inline strings)
│   │   │       └── drain-outbox.lua
│   │   ├── config/
│   │   │   └── env.ts
│   │   └── logger.ts
│   │
│   ├── domain/                      # Business logic — no HTTP/WS dependencies
│   │   ├── auth/
│   │   │   ├── auth.service.ts      # verifySignature, issueToken, deviceRegistration
│   │   │   └── auth.schema.ts       # zod schemas for request validation
│   │   ├── fallback/
│   │   │   ├── fallback.service.ts  # store, fetch, markReceived, flush
│   │   │   └── fallback.schema.ts
│   │   ├── presence/
│   │   │   └── presence.service.ts
│   │   ├── push/
│   │   │   ├── push.service.ts      # sendPush — real FCM integration
│   │   │   └── fcm.client.ts        # Firebase Admin SDK wrapper
│   │   ├── session/
│   │   │   ├── session.service.ts   # routing index, relay logic
│   │   │   └── session.schema.ts
│   │   └── turn/
│   │       └── turn.service.ts
│   │
│   ├── transport/                   # I/O layer — HTTP routes and WS handlers
│   │   ├── http/
│   │   │   ├── server.ts            # uWS app setup, route registration
│   │   │   ├── middleware/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── body.parser.ts
│   │   │   │   ├── cors.ts
│   │   │   │   └── rate-limit.ts
│   │   │   └── routes/
│   │   │       ├── auth.route.ts
│   │   │       ├── fallback.route.ts
│   │   │       ├── push.route.ts
│   │   │       └── turn.route.ts
│   │   └── ws/
│   │       ├── ws.server.ts         # uWS WS behavior + lifecycle
│   │       ├── ws.dispatch.ts       # message type → handler map
│   │       ├── handlers/            # One file per WS message category
│   │       │   ├── auth.handler.ts
│   │       │   ├── presence.handler.ts
│   │       │   ├── session.handler.ts
│   │       │   └── relay.handler.ts
│   │       └── rate-limit.ts
│   │
│   ├── jobs/                        # Background/scheduled work
│   │   ├── cron.ts                  # Scheduler
│   │   └── cleanup.job.ts           # Cleanup logic (separate from scheduler)
│   │
│   ├── errors/
│   │   ├── codes.ts
│   │   └── app.error.ts             # Typed AppError class for consistent throwing
│   │
│   └── types/
│       └── protocol.ts
│
├── migrations/
├── tests/
│   ├── unit/
│   │   ├── auth.service.test.ts
│   │   ├── fallback.service.test.ts
│   │   └── outbox.test.ts
│   ├── integration/
│   │   └── fallback.route.test.ts
│   └── fixtures/
│       └── db.fixture.ts
├── .env.example
├── package.json
└── tsconfig.json
```

**Key differences from current structure:**
- `domain/` layer contains zero HTTP/WS imports — fully testable in isolation
- `transport/` layer is thin: validates input, calls domain services, sends response
- `ws/handlers/` splits the monolithic `ws/server.ts` message handler into focused files
- `jobs/` separates the cron scheduler from the cleanup logic itself
- `tests/unit` vs `tests/integration` separation enables faster CI feedback loops

---

## 10. What To Do Better For The Future (Multi-Platform: Web, iOS, Desktop)

The vision document says "Android only" for v1, but the architecture is already almost platform-agnostic on the backend. Here is what to address before expanding to web, iOS, and desktop:

### Protocol Layer

**Finalize the WebSocket protocol in a versioned spec file.** Right now message types are string constants scattered across files. Write a `PROTOCOL.md` or an OpenAPI-equivalent (AsyncAPI) document before adding web clients — the contract becomes the source of truth, not the code.

**Add a protocol version handshake.** Send `server_caps` and a `min_protocol_version` in `auth:ok`. Web and mobile clients may be on different versions simultaneously. Handle this from day one or face a painful migration later.

### Push Notifications

**The FCM stub must become real.** And for Web you'll need Web Push (VAPID), for iOS you'll need APNs. Design the `push.service.ts` as an interface with platform-specific adapters:
```
PushAdapter interface
  ├── FcmAdapter        (Android)
  ├── ApnsAdapter       (iOS)
  └── WebPushAdapter    (Web / PWA)
```
The `platform` field is already in the `push_tokens` table and the registration endpoint validates `platform === 'android'` — this is already wired for extension.

### Authentication

**Implement the ECDSA signature verification now.** It is the cryptographic core of the entire security model. Without it, the auth system is security theater. Use Node.js `crypto.verify` with the stored `identity_pub` and the `auth_proof` from the request. The same protocol should work on iOS and web (Web Crypto API supports ECDSA).

**Plan a device label UI for multi-device.** When a user has Android, iOS, and web sessions simultaneously, they need to see and manage their trusted devices. Store meaningful `device_label` values (`iPhone 15 – Home`, `Chrome on MacBook`) and expose a device management API.

### Session Routing (Critical for Scale)

**Replace O(n) socket iteration with a proper routing index.** The current code iterates all connected sockets to find a peer. For web launch with 10× more concurrent users this will become a bottleneck. Use the `userSockets` and `sessionParties` maps described in section 8.

**Design session handoff for web reconnects.** Browser tabs can be killed and reopened. A WebRTC session must survive a momentary reconnect. Consider storing pending session state in Redis so a reconnecting web client can resume without a new `session:initiate`.

### Security Hardening

**Input validation with Zod on every endpoint.** Before opening to web traffic (which is far more attack-surface than a controlled Android app), every request body needs schema validation. Manually checking field presence does not catch type confusion attacks.

**Add CSRF protection for web.** The REST endpoints use Bearer tokens, which are safe from CSRF by design, but double-check that no cookie-based auth is ever introduced for web without `SameSite=Strict` protection.

**Implement refresh token rotation.** The current JWT is short-lived (`expires_in: 3600`). Mobile apps can silently refresh. Web apps on untrusted networks need a secure refresh token flow — consider a rotating refresh token stored `HttpOnly` in a cookie for web clients.

### Infrastructure

**Move off `setInterval` for cron to a proper job scheduler.** `node-cron` or BullMQ will survive process restarts, support distributed locking (so two instances don't double-run cleanup), and give you retries and observability.

**Add structured logging to a sink** (Loki, Datadog, etc.). The logger is already in place — adding a transport is a one-line change but essential before multi-platform launch creates debug volume.

**Containerize with a health check in the Dockerfile.** The `/health` endpoint exists — wire it into `HEALTHCHECK` so orchestrators (Kubernetes, Fly.io, Oracle Container Engine) can route traffic correctly.

---

*Overall assessment: This is a thoughtful, well-structured MVP with a clear security philosophy. The crypto primitives are chosen correctly (X25519, ECDSA), the data model is clean, and the code is readable. The primary gap is that the security model exists on paper but the signature verification — the entire foundation of the auth system — is not yet implemented. Fix that, add Zod validation, and finish the FCM integration, and this is a solid base to ship and expand to additional platforms.*
