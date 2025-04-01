import jwt from 'jsonwebtoken';
import blacklistModel from '../models/blacklistModel.js';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    try {
        // Check if token is blacklisted
        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ success: false, message: 'Session expired, login again' });
        }

        // Verify token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid Token, Login Again' });
    }
};

export default userAuth;
