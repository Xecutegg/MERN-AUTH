import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContent);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const inputRefs = useRef([]);

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
    };

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
            data.success ? toast.success(data.message) : toast.error(data.message);
            data.success && setIsEmailSent(true);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(input => input.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmitted(true);
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
            data.success ? toast.success(data.message) : toast.error(data.message);
            data.success && navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('bg.jpg')" }}>
            <div className="relative w-full md:w-[850px] h-[550px] bg-white rounded-none md:rounded-[35px] shadow-xl m-0 md:m-5 overflow-hidden">
                {/* Left Decorative Panel */}
                <div className="absolute left-0 w-full md:w-1/2 h-full bg-blue-600 flex flex-col items-center justify-center text-white p-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center">Password Recovery</h1>
                    <p className="text-center mb-8">Follow the steps to reset your password securely</p>
                </div>

                {/* Right Form Container */}
                <div className="absolute right-0 w-full md:w-1/2 h-full bg-white flex items-center px-5 md:px-10 py-16">
                    {!isEmailSent && (
                        <form onSubmit={onSubmitEmail} className="w-full">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Reset Password</h1>
                            
                            <div className="relative mb-7">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium"
                                />
                                <i className='bx bxs-envelope absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                            </div>

                            <button 
                                type="submit"
                                className="w-full h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-black hover:scale-105 transition-all duration-200"
                            >
                                Send OTP
                            </button>
                        </form>
                    )}

                    {isEmailSent && !isOtpSubmitted && (
                        <form onSubmit={onSubmitOtp} className="w-full">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Verify OTP</h1>
                            
                            <div className="flex justify-between mb-8" onPaste={handlePaste}>
                                {Array(6).fill(0).map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        required
                                        className="w-12 h-12 bg-gray-100 text-center text-xl rounded-lg border-none"
                                        ref={el => inputRefs.current[index] = el}
                                        onInput={(e) => handleInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                            </div>

                            <button 
                                type="submit"
                                className="w-full h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-black hover:scale-105 transition-all duration-200"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}

                    {isOtpSubmitted && (
                        <form onSubmit={onSubmitNewPassword} className="w-full">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">New Password</h1>
                            
                            <div className="relative mb-7">
                                <input 
                                    type="password" 
                                    placeholder="New Password" 
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium"
                                />
                                <i className='bx bxs-lock-alt absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                            </div>

                            <button 
                                type="submit"
                                className="w-full h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-black hover:scale-105 transition-all duration-200"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;