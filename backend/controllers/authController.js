import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// Register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

         // seding welcome email to user
         const mailOptions = {
                from: "soumogoswami2003@gmail.com", // Must match the SMTP_USER
                to: email,
                subject: 'Welcome to One Dream',
                text: `Hello Welcome to One Dream, we are happy to have you with us with this email id: ${email}.`,
        }

        try {
            await transporter.sendMail(mailOptions);
            return res.status(201).json({ success: true, message: 'User created successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
        }        

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Login an existing user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Logout a user
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// sending verify otp
export const sendVerifyOtp = async (req, res) => {

    try {

        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({ success: false, message: 'Account already verified'});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));


        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 10 * 60 * 1000;

        await user.save();

        // sending otp to user
        const mailOptions = {
            from: "soumogoswami2003@gmail.com", // Must match the SMTP_USER
            to: user.email, // Use the email from the user object
            subject: 'Account Verification OTP',
            text: `Your OTP is ${user.verifyOtp}. Verify your account using this OTP.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Verification Otp sent successfully'});
        
    } catch (error) {
       res.json({ success: false, message: error.message})
        
    }

}

// verify email using otp
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp){
        return res.json({ success: false, message: 'Missing Details'});
    }

    try {
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({ success: false, message: 'User Not found'});
        }

        if(user.verifyOtp == '' || user.verifyOtp !== otp){
            return res.json({ success: false, message: 'Invalid Otp'});
        }

        if(user.verifyOtpExpiresAt < Date.now()){
            return res.json({ success: false, message: 'Otp expired'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiresAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Email verified successfully'});

    } catch (error) {

        return res.json({ success: false, message: 'Missing Details'});
    }
}

// CHECK IF USER IS LOGGED IN

export const isAuthenticated = async (req, res) => {

    try {
        return res.json({ success: true, message: 'User is logged in'});
        
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

// Send password reset otp
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
            return res.json({ success: false, message: 'Email Required' });
    }

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));


        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 10 * 60 * 1000;

        await user.save();

        // sending otp to user
        const mailOptions = {
            from: "soumogoswami2003@gmail.com", // Must match the SMTP_USER
            to: user.email, // Use the email from the user object
            subject: 'Password Reset OTP',
            text: `Your OTP For reseting your password is ${user.resetOtp}. use the otp and change the password.`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Reset Otp sent successfully'});


        
    } catch (error) {
        res.json({ success: false, message: error.message});
        
    }
}


// reset password using otp

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({ success: false, message: 'Email Otp And A New Password Required'});
    }

    try {

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({ success: false, message: 'User not found'});
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({ success: false, message: 'Invalid Otp'});
        }

        if(user.resetOtpExpiresAt < Date.now()){
            return res.json({ success: false, message: 'Otp expired'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiresAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password reset successfully'});

        
        
    } catch (error) {
        res.json({ success: false, message: error.message});
        
    }
}