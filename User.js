import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    discordId: { // discord data
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {  // discord data (dc username)
        type: String,
        required: true
    },
    youtubeChannelId: { // user's yt channel Id (public data)
        type: String,
        default: null
    },
    youtubeChannelName: { // user's yt channel Name (public data)
        type: String,
        default: null
    },
    youtubeChannelImage: { // user's yt channel logo url (public data)
        type: String,
        default: null
    },
    youtubeBannerImage: { // user's yt channel banner img url (public data)
        type: String,
        default: null
    },
    accessToken: { // Google oauth accessToken (encrypted)
        type: String,
        default: null
    },
    refreshToken: { // Google oauth refreshToken (encrypted)
        type: String,
        default: null
    },
    tokenExpiry: { // token expiry date
        type: Date,
        default: null
    },
    subscriptionStatus: { // if user subscribed janvi Dreamer it is true else false 
        type: Boolean,
        default: false
    },
    membershipStatus: { // if user is a paid member of janvi's yt channel
        type: String,
        enum: ['none', 'TIER1', 'TIER2', 'TIER3'],
        default: 'none'
    },
    membershipTier: { if // user is a paid member of janvi's yt channel
        type: String,
        default: null
    },
    roles: [{ // Which role does the user get after verification
        type: String
    }],
    lastRoleUpdate: { // last role update date
        type: Date,
        default: Date.now
    },
    OAuth2Disconnected: { // if user revoke access form myaccount.google.com/permissions our system detect this (our system scan all users in every 8 hours) system marked OAuth2Disconnected true and our db cleaning system (running in every 12h) will delete all data permanently
        type: Boolean,
        default: false
    },
    verificationAttempts: { // How many times a user visits the website to verify with a verification token (not a Google data) 
        type: Number,
        default: 0
    },
    verificationStatus: { // no Google data
        type: String,
        enum: ['pending', 'verified', 'expired'],
        default: 'pending'
    },
    lastScanned: { // last scan time 
        type: Date,
        default: Date.now
    },
    displayName: { // User's discord display name
        type: String,
        default: null
    },
    avatarUrl: { // it is always null
        type: String,
        default: null
    },
    createdAt: { // verified time
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
