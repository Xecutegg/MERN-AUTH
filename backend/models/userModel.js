// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {type: String,required: true},
//     email: {type: String,required: true,unique: true},
//     password: {type: String,required: true},
//     verifyOtp: {type: String,default:''},
//     verifyOtpExpiresAt: {type: Date,default: 0},
//     isAccountVerified: {type: Boolean,default: false},
//     resetOtp: {type: String,default:''},
//     resetOtpExpiresAt: {type: Date,default: 0},

// });

// const userModel = mongoose.models || ('User',userSchema);

// export default userModel;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiresAt: { type: Date, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpiresAt: { type: Date, default: 0 },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;