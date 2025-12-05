import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true
    },
    youtubeChannelId: {
        type: String,
        default: null
    },
    youtubeChannelName: {
        type: String,
        default: null
    },
    youtubeChannelImage: {
        type: String,
        default: null
    },
    youtubeBannerImage: {
        type: String,
        default: null
    },
    accessToken: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    tokenExpiry: {
        type: Date,
        default: null
    },
    subscriptionStatus: {
        type: Boolean,
        default: false
    },
    membershipStatus: {
        type: String,
        enum: ['none', 'TIER1', 'TIER2', 'TIER3'],
        default: 'none'
    },
    membershipTier: {
        type: String,
        default: null
    },
    roles: [{
        type: String
    }],
    lastRoleUpdate: {
        type: Date,
        default: Date.now
    },
    OAuth2Disconnected: {
        type: Boolean,
        default: false
    },
    verificationAttempts: {
        type: Number,
        default: 0
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'expired'],
        default: 'pending'
    },
    lastScanned: {
        type: Date,
        default: Date.now
    },
    displayName: {
        type: String,
        default: null
    },
    avatarUrl: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

userSchema.index({ lastScanned: 1 });
userSchema.index({ OAuth2Disconnected: 1 });
userSchema.index({ accessToken: 1 });

export { userSchema };
