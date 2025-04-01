import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' } // Auto-delete after 7 days
});

const blacklistModel = mongoose.model('Blacklist', blacklistSchema);

export default blacklistModel;
