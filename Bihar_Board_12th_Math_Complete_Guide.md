# 📚 Bihar Board 12th Mathematics — Complete Study Guide
### (Hinglish mein — Sabse Easy aur Detail mein!)

> **💡 Tip:** Jo chapters ke saath `⭐⭐⭐` hai, wo MOST IMPORTANT hain — exam mein sabse zyada marks wahan se aate hain!

---

## 📋 Chapter Index (Syllabus Overview)

| # | Chapter Name | Marks Weight | Importance |
|---|-------------|-------------|------------|
| 1 | Relations and Functions | ~6 marks | ⭐⭐ |
| 2 | Inverse Trigonometric Functions | ~4 marks | ⭐⭐ |
| 3 | Matrices | ~8 marks | ⭐⭐⭐ |
| 4 | Determinants | ~8 marks | ⭐⭐⭐ |
| 5 | Continuity and Differentiability | ~10 marks | ⭐⭐⭐ |
| 6 | Application of Derivatives | ~8 marks | ⭐⭐⭐ |
| 7 | Integrals | ~12 marks | ⭐⭐⭐ |
| 8 | Application of Integrals | ~6 marks | ⭐⭐ |
| 9 | Differential Equations | ~6 marks | ⭐⭐⭐ |
| 10 | Vector Algebra | ~6 marks | ⭐⭐ |
| 11 | Three Dimensional Geometry | ~8 marks | ⭐⭐⭐ |
| 12 | Linear Programming | ~6 marks | ⭐⭐ |
| 13 | Probability | ~8 marks | ⭐⭐⭐ |

---

---

# 📘 UNIT 1: RELATIONS AND FUNCTIONS

## Chapter 1 — Relations and Functions ⭐⭐

### 🔹 Kya Hota Hai Relation?

Relation matlab do sets ke beech ka connection hota hai.

Agar `A = {1, 2, 3}` aur `B = {4, 5, 6}` hai, to koi bhi pairing (subset of A × B) ek relation hai.

**Cartesian Product (A × B):**  
`A × B = {(a, b) : a ∈ A, b ∈ B}`

---

### 🔹 Types of Relations (Bahut Important!)

#### 1. Empty Relation
Jab koi bhi element relate na kare. Set mein koi ordered pair nahi.

#### 2. Universal Relation
Sab elements ek doosre se related hain. Matlab puri A × A relation hai.

#### 3. Reflexive Relation ✅
Har element apne aap se related ho.  
`(a, a) ∈ R for all a ∈ A`

> **Example:** "Same age ka hai" — sab apni apni umar se same hain.

#### 4. Symmetric Relation ✅
Agar `(a, b) ∈ R` to `(b, a) ∈ R` bhi hona chahiye.

> **Example:** "Dost hai" — agar A, B ka dost hai to B, A ka bhi dost hai.

#### 5. Transitive Relation ✅
Agar `(a, b) ∈ R` aur `(b, c) ∈ R` to `(a, c) ∈ R`.

> **Example:** A > B aur B > C, to A > C.

#### 6. 🌟 Equivalence Relation (MOST IMPORTANT)
Jo ek saath **Reflexive + Symmetric + Transitive** ho.

> **Trick yaad karo: RST = Equivalence!**

---

### 🔹 Functions (Phalan)

Function ek special relation hai jahan har element of A ka exactly ek image hota hai B mein.

**Types of Functions:**

| Type | Meaning | Condition |
|------|---------|-----------|
| **One-One (Injective)** | Alag-alag inputs ka alag-alag output | f(a) = f(b) ⟹ a = b |
| **Onto (Surjective)** | Har element of B ka pre-image ho | Range = Codomain |
| **Bijective** | One-One + Onto dono | Perfect pairing |

### 🔹 Composition of Functions

`(fog)(x) = f(g(x))`

> **Note:** `fog ≠ gof` generally

### 🔹 Invertible Functions

Agar function bijective hai, tabhi uska inverse exist karta hai.

`f⁻¹(y) = x ⟺ f(x) = y`

---

---

# 📘 UNIT 2: ALGEBRA

## Chapter 2 — Inverse Trigonometric Functions ⭐⭐

### 🔹 Kya Hoti Hai Inverse Trig?

Normal trig functions many-to-one hote hain, isliye unka direct inverse nahi hota. Hum restricted domain use karte hain.

### 🔹 Important Domains & Ranges

| Function | Domain | Range (Principal Value) |
|---------|--------|------------------------|
| sin⁻¹(x) | [-1, 1] | [-π/2, π/2] |
| cos⁻¹(x) | [-1, 1] | [0, π] |
| tan⁻¹(x) | (-∞, ∞) | (-π/2, π/2) |
| cosec⁻¹(x) | (-∞,-1]∪[1,∞) | [-π/2,π/2]-{0} |
| sec⁻¹(x) | (-∞,-1]∪[1,∞) | [0,π]-{π/2} |
| cot⁻¹(x) | (-∞, ∞) | (0, π) |

### 🔹 Key Formulas (Yaad Karo!)

```
sin⁻¹(x) + cos⁻¹(x) = π/2
tan⁻¹(x) + cot⁻¹(x) = π/2
sec⁻¹(x) + cosec⁻¹(x) = π/2

sin⁻¹(-x) = -sin⁻¹(x)
cos⁻¹(-x) = π - cos⁻¹(x)
tan⁻¹(-x) = -tan⁻¹(x)

tan⁻¹(x) + tan⁻¹(y) = tan⁻¹((x+y)/(1-xy))   [xy < 1]
2tan⁻¹(x) = sin⁻¹(2x/(1+x²)) = cos⁻¹((1-x²)/(1+x²))
```

> **Exam Trick:** "sin inverse plus cos inverse = pi/2" — ye ek important property hai, bahut baar direct question aata hai!

---

---

## ⭐⭐⭐ Chapter 3 — Matrices (BAHUT IMPORTANT!)

### 🔹 Matrix Kya Hai?

Numbers ka ek rectangular arrangement rows aur columns mein.

```
A = [a₁₁  a₁₂  a₁₃]    ← Row 1
    [a₂₁  a₂₂  a₂₃]    ← Row 2
```

**Order:** m × n matrix = m rows aur n columns

### 🔹 Types of Matrices

| Type | Description | Example |
|------|-------------|---------|
| **Row Matrix** | Sirf ek row | [1  2  3] |
| **Column Matrix** | Sirf ek column | [1; 2; 3] |
| **Square Matrix** | Rows = Columns | 2×2, 3×3 |
| **Zero Matrix** | Sab elements 0 | [0 0; 0 0] |
| **Identity Matrix (I)** | Diagonal = 1, baaki 0 | [1 0; 0 1] |
| **Diagonal Matrix** | Off-diagonal sab 0 | [2 0; 0 5] |
| **Symmetric Matrix** | A = Aᵀ | aᵢⱼ = aⱼᵢ |
| **Skew-Symmetric** | A = -Aᵀ | aᵢⱼ = -aⱼᵢ, diagonal = 0 |

### 🔹 Matrix Operations

#### Addition/Subtraction
Same order wali matrices ko add/subtract karte hain.
`(A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ`

#### Scalar Multiplication
`(kA)ᵢⱼ = k × aᵢⱼ`

#### 🌟 Matrix Multiplication (MOST IMPORTANT)

A (m×n) × B (n×p) = C (m×p)

**Condition:** A ke columns = B ke rows

```
Agar A = [1 2]  aur B = [5 6]
         [3 4]           [7 8]

A×B = [(1×5 + 2×7)  (1×6 + 2×8)]  =  [19  22]
      [(3×5 + 4×7)  (3×6 + 4×8)]     [43  50]
```

> **Important:** AB ≠ BA (Matrix multiplication commutative nahi hota!)

### 🔹 Transpose of Matrix (Aᵀ)

Rows ko columns bana do, columns ko rows.

**Properties:**
```
(Aᵀ)ᵀ = A
(A+B)ᵀ = Aᵀ + Bᵀ
(AB)ᵀ = BᵀAᵀ    ← ORDER ULTA HOTA HAI!
(kA)ᵀ = kAᵀ
```

### 🔹 Important Theorem

**Har matrix ko ek symmetric aur ek skew-symmetric matrix ke sum mein likha ja sakta hai:**

```
A = (A + Aᵀ)/2  +  (A - Aᵀ)/2
    ↑                ↑
  Symmetric       Skew-Symmetric
```

### 🔹 Elementary Operations (Row Operations)

1. `Rᵢ ↔ Rⱼ` — Do rows ki aapas mein swap
2. `Rᵢ → kRᵢ` — Row ko k se multiply karo
3. `Rᵢ → Rᵢ + kRⱼ` — Ek row mein doosri row ka multiple add karo

> **Exam mein:** Elementary operations use karke matrices solve karna aata hai zaroor seekho!

---

## ⭐⭐⭐ Chapter 4 — Determinants (BAHUT IMPORTANT!)

### 🔹 Determinant Kya Hota Hai?

Har square matrix ka ek number hota hai jise determinant kehte hain. `|A|` ya `det(A)` se denote karte hain.

### 🔹 2×2 Matrix ka Determinant

```
|a  b|  =  ad - bc
|c  d|
```

**Example:**
```
|3  2|  =  (3×4) - (2×1) = 12 - 2 = 10
|1  4|
```

### 🔹 3×3 Matrix ka Determinant (Expansion)

```
|a₁ b₁ c₁|
|a₂ b₂ c₂|  = a₁(b₂c₃ - b₃c₂) - b₁(a₂c₃ - a₃c₂) + c₁(a₂b₃ - a₃b₂)
|a₃ b₃ c₃|
```

> **Trick:** + - + sign alternating hota hai pehli row mein!

### 🔹 Properties of Determinants (Bahut Kaam Aate Hain)

1. `|Aᵀ| = |A|` — Transpose se determinant nahi badlta
2. Ek row/column zero hai to `|A| = 0`
3. Do rows/columns same hain to `|A| = 0`
4. Rows/Columns swap karo to sign badal jata hai
5. Row mein scalar k multiply karo to `|A|` bhi k se multiply hoga
6. `|AB| = |A||B|` — Very Important!
7. `|kA| = kⁿ|A|` for n×n matrix

### 🔹 🌟 Minors and Cofactors

**Minor (Mᵢⱼ):** Element aᵢⱼ ka minor = us element ki row aur column hatane ke baad bacha determinant.

**Cofactor (Aᵢⱼ):** `Aᵢⱼ = (-1)^(i+j) × Mᵢⱼ`

### 🔹 🌟 Adjoint and Inverse of Matrix

**Adjoint (adj A):** Cofactors ki matrix ka transpose.

**Inverse:**
```
A⁻¹ = adj(A) / |A|
```

> **Important Condition:** A⁻¹ exist karta hai SIRF tab jab `|A| ≠ 0` (Non-singular matrix)

### 🔹 🌟 Solving Linear Equations (Cramer's Rule & Matrix Method)

**System of equations:**
```
a₁x + b₁y + c₁z = d₁
a₂x + b₂y + c₂z = d₂
a₃x + b₃y + c₃z = d₃
```

**Matrix Form:** `AX = B`

**Solution:** `X = A⁻¹B`  (Agar |A| ≠ 0)

**Cramer's Rule:**
```
x = D₁/D,   y = D₂/D,   z = D₃/D

Jahan D = |A|, D₁ = |A| mein pehla column B se replace karo, etc.
```

### 🔹 Area of Triangle using Determinant

```
Area = (1/2)|x₁  y₁  1|
             |x₂  y₂  1|
             |x₃  y₃  1|
```

> **Tip:** Agar area = 0, to teen points collinear hain!

---

---

# 📘 UNIT 3: CALCULUS (SABSE BADA AUR IMPORTANT UNIT!)

## ⭐⭐⭐ Chapter 5 — Continuity and Differentiability

### 🔹 Continuity Kya Hoti Hai?

Ek function `f(x)` point `x = a` par continuous hai agar:

```
1. f(a) defined ho (exist kare)
2. lim(x→a) f(x) exist kare
3. lim(x→a) f(x) = f(a)
```

**Yaad rakhne ki baat:** Teeno conditions zaruri hain!

> **Simple samajh:** Graph mein koi toot ya jump na ho to continuous hai!

### 🔹 Left Hand Limit & Right Hand Limit

```
LHL = lim(x→a⁻) f(x)
RHL = lim(x→a⁺) f(x)

Limit exist karta hai iff LHL = RHL
```

### 🔹 Discontinuity ke Types

1. **Removable Discontinuity:** Limit exist karta hai lekin f(a) se match nahi karta
2. **Jump Discontinuity:** LHL ≠ RHL
3. **Infinite Discontinuity:** Limit infinity par jaata hai

### 🔹 🌟 Differentiability

Function `f` at `x = a` differentiable hai agar:

```
f'(a) = lim(h→0) [f(a+h) - f(a)] / h    exist kare
```

**Important Property:**
```
Differentiable ⟹ Continuous
Continuous ⇏ Differentiable  (converse sach nahi!)
```

> **Example:** `f(x) = |x|` at x=0: Continuous hai lekin Differentiable NAHI!

### 🔹 🌟 Derivatives — Key Formulas (MUST REMEMBER!)

```
d/dx (xⁿ)      = nxⁿ⁻¹
d/dx (eˣ)      = eˣ
d/dx (aˣ)      = aˣ ln(a)
d/dx (ln x)    = 1/x
d/dx (sin x)   = cos x
d/dx (cos x)   = -sin x
d/dx (tan x)   = sec²x
d/dx (cot x)   = -cosec²x
d/dx (sec x)   = sec x · tan x
d/dx (cosec x) = -cosec x · cot x

d/dx (sin⁻¹x)  = 1/√(1-x²)
d/dx (cos⁻¹x)  = -1/√(1-x²)
d/dx (tan⁻¹x)  = 1/(1+x²)
d/dx (cot⁻¹x)  = -1/(1+x²)
```

### 🔹 🌟 Rules of Differentiation

**Product Rule:**
```
d/dx [u·v] = u·(dv/dx) + v·(du/dx)
```

**Quotient Rule:**
```
d/dx [u/v] = [v·(du/dx) - u·(dv/dx)] / v²
```

**Chain Rule (Sabse Zyada Use Hota Hai):**
```
d/dx [f(g(x))] = f'(g(x)) · g'(x)

Example: d/dx[sin(x²)] = cos(x²) · 2x
```

### 🔹 🌟 Logarithmic Differentiation

Jab function ki form `y = f(x)^g(x)` ho:

```
Step 1: ln y = g(x) · ln[f(x)]
Step 2: Dono sides differentiate karo
Step 3: dy/dx isolate karo
```

**Example:** `y = xˣ`
```
ln y = x · ln x
(1/y)(dy/dx) = ln x + 1
dy/dx = y(ln x + 1) = xˣ(ln x + 1)
```

### 🔹 Implicit Differentiation

Jab y explicitly x ki terms mein express nahi hota.

**Example:** `x² + y² = 25`
```
2x + 2y(dy/dx) = 0
dy/dx = -x/y
```

### 🔹 🌟 Second Order Derivative

```
d²y/dx² = d/dx (dy/dx)
```

### 🔹 Rolle's Theorem & Mean Value Theorem

**Rolle's Theorem:** Agar f [a,b] par continuous, (a,b) par differentiable, aur f(a)=f(b) to ∃ c ∈ (a,b) such that f'(c) = 0.

**Mean Value Theorem (Lagrange):**
```
f'(c) = [f(b) - f(a)] / (b - a)
```

---

## ⭐⭐⭐ Chapter 6 — Application of Derivatives

### 🔹 Rate of Change

`dy/dx` means y ki rate of change with respect to x.

> **Practical example:** Area of circle `A = πr²`, to `dA/dt = 2πr · (dr/dt)`

### 🔹 Increasing & Decreasing Functions

```
f'(x) > 0  ⟹  f strictly increasing on interval
f'(x) < 0  ⟹  f strictly decreasing on interval
f'(x) = 0  ⟹  stationary point
```

### 🔹 🌟 Maxima and Minima (EXAM FAVOURITE!)

#### First Derivative Test:
1. `f'(x) = 0` solve karo — ye critical points hain
2. Sign change check karo:
   - `+ to -` ⟹ Local Maximum
   - `- to +` ⟹ Local Minimum
   - No change ⟹ Neither

#### Second Derivative Test:
```
f'(c) = 0 par:
  f''(c) < 0  ⟹  Local Maximum
  f''(c) > 0  ⟹  Local Minimum
  f''(c) = 0  ⟹  Test Fail (use first derivative test)
```

### 🔹 Tangents and Normals

**Slope of tangent** at (x₁, y₁): `m = (dy/dx) at (x₁, y₁)`

```
Equation of Tangent:  y - y₁ = m(x - x₁)
Equation of Normal:   y - y₁ = (-1/m)(x - x₁)
```

> **Tip:** Tangent aur Normal ek doosre ke perpendicular hote hain!

### 🔹 Approximations

```
f(x + Δx) ≈ f(x) + Δx · f'(x)
```

**Example:** `√(25.3)` dhundho:
```
f(x) = √x, x = 25, Δx = 0.3
f'(x) = 1/(2√x), f'(25) = 1/10
√25.3 ≈ 5 + 0.3 × (1/10) = 5.03
```

---

## ⭐⭐⭐ Chapter 7 — Integrals (SABSE IMPORTANT CHAPTER!)

### 🔹 Integration Kya Hai?

Integration differentiation ka reverse process hai.

`∫ f(x) dx = F(x) + C`  jahan `F'(x) = f(x)`

**C = Constant of Integration** — Hamesha likhna!

### 🔹 🌟 Standard Integrals (MUST MEMORIZE!)

```
∫ xⁿ dx         = xⁿ⁺¹/(n+1) + C    [n ≠ -1]
∫ 1/x dx        = ln|x| + C
∫ eˣ dx         = eˣ + C
∫ aˣ dx         = aˣ/ln(a) + C
∫ sin x dx      = -cos x + C
∫ cos x dx      = sin x + C
∫ sec²x dx      = tan x + C
∫ cosec²x dx    = -cot x + C
∫ sec x tan x dx = sec x + C
∫ cosec x cot x dx = -cosec x + C
∫ tan x dx      = ln|sec x| + C
∫ cot x dx      = ln|sin x| + C
∫ sec x dx      = ln|sec x + tan x| + C
∫ cosec x dx    = ln|cosec x - cot x| + C

∫ 1/√(1-x²) dx = sin⁻¹x + C
∫ -1/√(1-x²) dx = cos⁻¹x + C
∫ 1/(1+x²) dx  = tan⁻¹x + C
∫ 1/√(a²-x²) dx = sin⁻¹(x/a) + C
∫ 1/(a²+x²) dx = (1/a)tan⁻¹(x/a) + C
∫ 1/√(x²-a²) dx = ln|x + √(x²-a²)| + C
∫ 1/√(x²+a²) dx = ln|x + √(x²+a²)| + C
```

### 🔹 🌟 Integration by Substitution

Jab function ke andar koi function ho.

```
∫ f(g(x)) · g'(x) dx

Substitution: t = g(x), dt = g'(x) dx
```

**Example:** `∫ 2x · cos(x²) dx`
```
t = x², dt = 2x dx
= ∫ cos(t) dt = sin(t) + C = sin(x²) + C
```

### 🔹 🌟 Integration by Parts (IBBNP)

```
∫ u · v dx = u · ∫v dx - ∫(du/dx · ∫v dx) dx
```

**ILATE Rule** — u choose karne ke liye:
```
I - Inverse Trig (sin⁻¹, cos⁻¹, tan⁻¹)
L - Logarithmic (ln x, log x)
A - Algebraic (x², x³, polynomials)
T - Trigonometric (sin, cos, tan)
E - Exponential (eˣ, aˣ)
```

> **Pehle wala u choose karo jisme ILATE mein pehle aata hai!**

**Example:** `∫ x · eˣ dx`
```
u = x (Algebraic), v = eˣ (Exponential)
A comes before E in ILATE, so u = x

= x · eˣ - ∫ 1 · eˣ dx
= x · eˣ - eˣ + C
= eˣ(x - 1) + C
```

### 🔹 🌟 Integration using Partial Fractions

Rational functions ko simple fractions mein todna.

**Case 1:** `1/((x+a)(x+b)) = A/(x+a) + B/(x+b)`

**Case 2:** `1/(x+a)² = A/(x+a) + B/(x+a)²`

**Case 3:** `1/((x+a)(x²+bx+c)) = A/(x+a) + (Bx+C)/(x²+bx+c)`

### 🔹 Special Integrals (Bahut Important!)

```
∫ √(a²-x²) dx = (x/2)√(a²-x²) + (a²/2)sin⁻¹(x/a) + C

∫ √(x²+a²) dx = (x/2)√(x²+a²) + (a²/2)ln|x+√(x²+a²)| + C

∫ √(x²-a²) dx = (x/2)√(x²-a²) - (a²/2)ln|x+√(x²-a²)| + C
```

### 🔹 🌟 Definite Integrals

```
∫ₐᵇ f(x) dx = F(b) - F(a)
```

**Important Properties:**
```
∫ₐᵇ f(x) dx = -∫ᵦₐ f(x) dx

∫ₐᵃ f(x) dx = 0

∫ₐᵇ f(x) dx = ∫ₐᶜ f(x) dx + ∫ᶜᵇ f(x) dx

∫ₐᵇ f(x) dx = ∫ₐᵇ f(a+b-x) dx

∫₀ᵃ f(x) dx = ∫₀ᵃ f(a-x) dx    ← Bahut useful!

∫₋ₐᵃ f(x) dx = 2∫₀ᵃ f(x) dx   [agar f even function hai]
∫₋ₐᵃ f(x) dx = 0               [agar f odd function hai]
```

---

## Chapter 8 — Application of Integrals ⭐⭐

### 🔹 Area Under Curve

Curve `y = f(x)`, x-axis ke beech, aur lines `x = a, x = b`:

```
Area = ∫ₐᵇ |f(x)| dx
```

**Agar curve x-axis ke neeche hai:** Absolute value lete hain.

### 🔹 Area Between Two Curves

```
Area = ∫ₐᵇ |f(x) - g(x)| dx
```

Jahan `f(x)` upar wali curve aur `g(x)` neeche wali curve hai.

### 🔹 Steps to Solve Area Problems

```
Step 1: Curves ko draw/sketch karo
Step 2: Intersection points dhundho (boundaries = limits)
Step 3: Upper curve - Lower curve ka integral lo
Step 4: Absolute value ensure karo (area negative nahi hoti)
```

> **Common exam questions:** Circle, parabola, ellipse ke areas!

---

## ⭐⭐⭐ Chapter 9 — Differential Equations

### 🔹 Differential Equation Kya Hai?

Ek equation jisme `dy/dx`, `d²y/dx²` etc. ho.

**Order:** Highest derivative ka order
**Degree:** Highest derivative ki power (after rationalization)

### 🔹 Types of Solutions

- **General Solution:** Arbitrary constants ke saath
- **Particular Solution:** Specific conditions (initial conditions) se constants find karke

### 🔹 🌟 Variable Separable Method

Jab equation ko form mein likha ja sake: `f(y) dy = g(x) dx`

```
dy/dx = g(x)/f(y)

f(y) dy = g(x) dx

Dono sides integrate karo!
```

**Example:** `dy/dx = x/y`
```
y dy = x dx
∫ y dy = ∫ x dx
y²/2 = x²/2 + C
y² - x² = 2C (ya C₁)
```

### 🔹 🌟 Homogeneous Differential Equations

Form: `dy/dx = f(y/x)`

**Method:**
```
Substitution: y = vx, dy/dx = v + x(dv/dx)
```

**Example:** `dy/dx = (x + y)/x`
```
= 1 + y/x = 1 + v
v + x(dv/dx) = 1 + v
x(dv/dx) = 1
dv = dx/x
v = ln|x| + C
y/x = ln|x| + C
y = x·ln|x| + Cx
```

### 🔹 🌟 Linear Differential Equations

**Standard Form:** `dy/dx + P(x)·y = Q(x)`

**Method:**
```
Step 1: P(x) aur Q(x) identify karo
Step 2: Integrating Factor (IF) = e^(∫P dx)
Step 3: Dono sides IF se multiply karo
Step 4: Left side = d/dx [y × IF]
Step 5: Integrate karo
```

**Solution:**
```
y × IF = ∫ Q(x) × IF dx + C
```

> **Tip:** Agar equation mein `dx/dy + Px = Q` ho, to x aur y roles swap kar lo!

---

---

# 📘 UNIT 4: VECTORS AND 3D GEOMETRY

## Chapter 10 — Vector Algebra ⭐⭐

### 🔹 Vector Kya Hota Hai?

Quantity jiske paas magnitude aur direction dono ho.

**Notation:** `→a` ya `â` (unit vector)

### 🔹 Types of Vectors

| Type | Description |
|------|-------------|
| Zero Vector | Magnitude = 0 |
| Unit Vector | Magnitude = 1 |
| Equal Vectors | Same magnitude aur direction |
| Collinear | Parallel ya anti-parallel |
| Position Vector | Origin se kisi point tak |

### 🔹 Operations

**Addition:** Triangle Law ya Parallelogram Law

**Position Vector:**
`→OP = xî + yĵ + zk̂`

**Magnitude:**
`|→a| = √(x² + y² + z²)`

**Unit Vector:**
`â = →a / |→a|`

### 🔹 🌟 Dot Product (Scalar Product)

```
→a · →b = |→a||→b| cos θ

= a₁b₁ + a₂b₂ + a₃b₃  (component form)
```

**Properties:**
```
→a · →a = |→a|²
→a · →b = 0  ⟹  vectors perpendicular hain (agar non-zero)
cos θ = (→a · →b) / (|→a| |→b|)
```

### 🔹 🌟 Cross Product (Vector Product)

```
→a × →b = |→a||→b| sin θ  n̂

|î  ĵ  k̂ |
|a₁ a₂ a₃|
|b₁ b₂ b₃|
```

**Properties:**
```
→a × →b = -(→b × →a)    [anti-commutative]
→a × →b = 0  ⟹  vectors parallel hain
|→a × →b| = Area of parallelogram

î × ĵ = k̂,   ĵ × k̂ = î,   k̂ × î = ĵ
î × î = ĵ × ĵ = k̂ × k̂ = 0
```

### 🔹 Scalar Triple Product

```
[→a →b →c] = →a · (→b × →c)

Volume of Parallelepiped = |[→a →b →c]|
```

> **Important:** Agar [→a →b →c] = 0, to vectors coplanar hain!

---

## ⭐⭐⭐ Chapter 11 — Three Dimensional Geometry

### 🔹 Direction Cosines (l, m, n)

Ek line ke direction cosines angles α, β, γ ke cosines hain jo line x, y, z axes se banati hai.

```
l = cos α,  m = cos β,  n = cos γ

l² + m² + n² = 1    (Important property!)
```

**Direction Ratios (a, b, c):**
```
l/a = m/b = n/c = 1/√(a² + b² + c²)
```

### 🔹 🌟 Equation of Line

**Vector Form:**
```
→r = →a + λ→b
```
Jahan `→a` = point on line, `→b` = direction vector

**Cartesian Form:**
```
(x - x₁)/a = (y - y₁)/b = (z - z₁)/c = λ
```

### 🔹 Angle Between Two Lines

```
cos θ = |l₁l₂ + m₁m₂ + n₁n₂|

Parallel:       a₁/a₂ = b₁/b₂ = c₁/c₂
Perpendicular:  a₁a₂ + b₁b₂ + c₁c₂ = 0
```

### 🔹 🌟 Equation of Plane

**Vector Form:**
```
→r · →n = d
```

**Cartesian Form:**
```
ax + by + cz = d
```
Jahan (a, b, c) = normal vector to plane

**Plane through 3 points:**
```
|x-x₁  y-y₁  z-z₁|
|x₂-x₁ y₂-y₁ z₂-z₁| = 0
|x₃-x₁ y₃-y₁ z₃-z₁|
```

**Intercept Form:**
```
x/a + y/b + z/c = 1
```

### 🔹 Distance Formulas (Exam Favourite!)

**Point se Plane ki distance:**
```
d = |ax₁ + by₁ + cz₁ - d| / √(a² + b² + c²)
```

**Two Planes ke Beech Angle:**
```
cos θ = |a₁a₂ + b₁b₂ + c₁c₂| / (√(a₁²+b₁²+c₁²) × √(a₂²+b₂²+c₂²))
```

**Planes ki Conditions:**
```
Parallel:       a₁/a₂ = b₁/b₂ = c₁/c₂
Perpendicular:  a₁a₂ + b₁b₂ + c₁c₂ = 0
```

### 🔹 Skew Lines aur Shortest Distance

Jo lines na milti hain na parallel hoti hain — inhe Skew Lines kehte hain.

```
Shortest Distance = |(→a₂-→a₁) · (→b₁×→b₂)| / |→b₁×→b₂|
```

---

---

# 📘 UNIT 5: LINEAR PROGRAMMING

## Chapter 12 — Linear Programming ⭐⭐

### 🔹 LPP Kya Hai?

Linear Programming Problem — ek optimization problem jisme linear constraints ke under objective function maximize ya minimize karna hota hai.

### 🔹 Key Terms

| Term | Meaning |
|------|---------|
| **Objective Function** | Jise maximize/minimize karna hai (Z = ax + by) |
| **Constraints** | Conditions (inequalities) |
| **Feasible Region** | Sab constraints satisfy karne wala region |
| **Corner Points** | Feasible region ke vertices |
| **Optimal Solution** | Corner point jahan objective function optimal ho |

### 🔹 🌟 Steps to Solve LPP

```
Step 1: Decision variables identify karo (x, y)
Step 2: Objective function likhो (Z = ...)
Step 3: Constraints list karo (inequalities)
Step 4: Graph draw karo (constraints plot karo)
Step 5: Feasible region shade karo
Step 6: Corner points find karo (intersection points)
Step 7: Har corner point par Z calculate karo
Step 8: Maximum ya Minimum Z value = answer!
```

### 🔹 Important Theorems

1. **Fundamental Theorem:** Agar optimal solution exist karta hai, to corner point par milta hai.
2. **Bounded Region:** Dono max aur min exist karte hain.
3. **Unbounded Region:** May or may not have optimal solution.

> **Exam Tip:** Corner points hamesha carefully dhundho — yahi most common mistake hoti hai!

---

---

# 📘 UNIT 6: PROBABILITY

## ⭐⭐⭐ Chapter 13 — Probability (BAHUT IMPORTANT!)

### 🔹 Basic Concepts

```
P(A) = Number of favorable outcomes / Total outcomes

0 ≤ P(A) ≤ 1
P(A) + P(A') = 1  [Complementary events]
```

### 🔹 🌟 Conditional Probability

```
P(A|B) = P(A ∩ B) / P(B)    [B event occur ho gaya, A ki probability]
P(B|A) = P(A ∩ B) / P(A)
```

**Properties:**
```
P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
P(A ∩ B) = P(A) × P(B|A)    [Multiplication Rule]
```

### 🔹 🌟 Independent Events

Events A aur B independent hain agar:
```
P(A ∩ B) = P(A) × P(B)

Iska matlab: P(A|B) = P(A)  aur  P(B|A) = P(B)
```

> **Important Difference:** Mutually Exclusive ≠ Independent!
> - Mutually Exclusive: A ∩ B = ∅
> - Independent: P(A ∩ B) = P(A)P(B)

### 🔹 🌟 Bayes' Theorem (EXAM FAVOURITE!)

Bayes' theorem se hum "backwards probability" dhundhte hain.

```
P(Eᵢ|A) = P(Eᵢ) × P(A|Eᵢ) / Σ P(Eⱼ) × P(A|Eⱼ)
```

**Terms:**
- `P(Eᵢ)` = Prior probability (pehle ki probability)
- `P(A|Eᵢ)` = Likelihood (Eᵢ given A ki probability)
- `P(Eᵢ|A)` = Posterior probability (A dekhne ke baad)

**Total Probability Theorem:**
```
P(A) = P(E₁)P(A|E₁) + P(E₂)P(A|E₂) + ... + P(Eₙ)P(A|Eₙ)
```

### 🔹 🌟 Random Variables and Probability Distribution

**Random Variable (X):** Har outcome ko ek number assign karta hai.

**Probability Distribution Table:**
```
X:    x₁    x₂    x₃  ...
P(X): p₁    p₂    p₃  ...

Condition: Σ pᵢ = 1  (sab probabilities ka sum = 1)
```

**Mean (Expected Value):**
```
E(X) = μ = Σ xᵢ pᵢ
```

**Variance:**
```
Var(X) = σ² = Σ xᵢ² pᵢ - μ²
       = E(X²) - [E(X)]²
```

**Standard Deviation:**
```
σ = √Var(X)
```

### 🔹 🌟 Binomial Distribution (MUST KNOW!)

Jab:
- n trials hain (fixed)
- Har trial independent hai
- Sirf 2 outcomes: Success (p) ya Failure (q = 1-p)
- p constant rehta hai

```
P(X = r) = ⁿCᵣ × pʳ × qⁿ⁻ʳ

r = 0, 1, 2, ..., n
q = 1 - p
```

**Mean = np**
**Variance = npq**
**Standard Deviation = √(npq)**

**Example:**
```
Ek fair coin 6 baar uchhali, P(exactly 4 heads) = ?

n = 6, r = 4, p = 1/2, q = 1/2

P(X=4) = ⁶C₄ × (1/2)⁴ × (1/2)²
        = 15 × 1/16 × 1/4
        = 15/64
```

---

---

# 🎯 EXAM STRATEGY & QUICK TIPS

## ⭐ Most Important Topics for Bihar Board

```
📌 DEFINITELY AAYENGE (High Probability):
├── Determinants se System of Equations solve karna
├── Maxima/Minima problems (Calculus)
├── Integration by Parts
├── Definite Integrals with properties
├── Linear Differential Equations
├── Bayes' Theorem
├── Binomial Distribution
├── 3D Geometry (distance formula, planes)
└── Matrix Inverse

📌 AKSAR AATE HAIN:
├── Continuity/Differentiability (f(x)=|x| type)
├── Area using Integrals
├── Vector dot/cross product
├── LPP (graphical method)
└── Equivalence Relations
```

## 🔢 Marks Distribution Strategy

```
Lagbhag:
- Calculus (Ch 5,6,7,8,9): ~36 marks
- Algebra (Ch 3,4): ~16 marks  
- Probability (Ch 13): ~8 marks
- 3D Geometry (Ch 11): ~8 marks
- Vectors (Ch 10): ~6 marks
- Relations & Functions (Ch 1,2): ~10 marks
- Linear Programming (Ch 12): ~6 marks
```

## 💡 Golden Rules for Exam

1. **Integration formulas** — ek bar likhkar table banao aur daily dekho
2. **Determinants** — cofactor expansion mein sign galti mat karo (`+ - +` pattern)
3. **Differential equations** — IF dhundne mein dhyan do
4. **Probability** — Bayes theorem ke liye tree diagram banao
5. **3D Geometry** — Formulas yaad karo, practice karo
6. **LPP** — Corner points carefully dhundho
7. **Integration** — ILATE rule hamesha use karo
8. **Matrices** — AB ≠ BA yaad rakhna

## 📝 Last 15 Days Strategy

```
Week 1: Calculus heavy revision (Ch 5,6,7,9)
Week 2: Algebra + Probability + 3D (Ch 3,4,11,13)
Last 2 days: Formula revision + Sample papers
```

---

## 🏆 All The Best Bihar Board Students!

> _"Mathematics wo language hai jo universe bolti hai. Isko samjho, ratto mat!"_  
> Practice karte raho, formulas yaad karo, aur confident raho! 💪

---
*Guide prepared for Bihar School Examination Board (BSEB) Class 12 Mathematics*  
*Total Marks: 100 | Theory: 80 + Internal: 20*
