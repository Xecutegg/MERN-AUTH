import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const endpoint = isActive ? '/api/auth/register' : '/api/auth/login';
            const payload = isActive ? formData : { email: formData.email, password: formData.password };

            const { data } = await axios.post(backendUrl + endpoint, payload);

            if (data.success) {
                setIsLoggedin(true);
                await getUserData();
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Something went wrong");
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('bg.jpg')" }}>
            <div className={`relative w-full md:w-[850px] h-[550px] bg-white rounded-none md:rounded-[35px] shadow-xl m-0 md:m-5 overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'active' : ''
                }`}>
                {/* Login Form */}
                <div className={`absolute right-0 w-full md:w-1/2 h-full bg-white flex items-center px-5 md:px-10 py-16 z-10 transition-all duration-1000 ease-in-out delay-200 ${isActive ? 'md:right-1/2' : ''
                    }`}>
                    <form className="w-full" onSubmit={onSubmitHandler}>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Login</h1>

                        <div className="relative mb-7">
                            <input type="email" name="email" placeholder="Email" required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium" />
                            <i className='bx bxs-envelope absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                        </div>

                        <div className="relative mb-7">
                            <input type="password" name="password" placeholder="Password" required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium" />
                            <i className='bx bxs-lock-alt absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                        </div>

                        <button type="submit" className="w-full h-10 bg-blue-600 text-white rounded-lg shadow-md hover:bg-black hover:scale-105 transition-all duration-200">
                            Login
                        </button>

                        <p onClick={() => navigate('/reset-password')} className='mt-4 text-indigo-500 cursor-pointer'>Forgot Password</p>

                        <p className="text-sm text-gray-600 my-6">Or Login With Social Platforms</p>

                        <div className="flex justify-center gap-4">
                            {['bxl-discord-alt', 'bxl-google'].map((icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-full text-2xl text-gray-700 shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-blue-600 hover:scale-105 transition-all duration-300"
                                >
                                    <i className={`bx ${icon}`} />
                                </a>
                            ))}
                        </div>
                    </form>
                </div>

                {/* Register Form */}
                <div className={`absolute right-0 w-full md:w-1/2 h-full bg-white flex items-center px-5 md:px-10 py-16 z-10 transition-all duration-1000 ease-in-out delay-200 ${isActive ? 'visible md:right-1/2' : 'invisible'
                    }`}>
                    <form className="w-full" onSubmit={onSubmitHandler}>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Registration</h1>

                        <div className="relative mb-7">
                            <input type="text" name="name" placeholder="Username" required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium" />
                            <i className='bx bxs-user absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                        </div>

                        <div className="relative mb-7">
                            <input type="email" name="email" placeholder="Email" required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium" />
                            <i className='bx bxs-envelope absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                        </div>

                        <div className="relative mb-7">
                            <input type="password" name="password" placeholder="Password" required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 font-medium" />
                            <i className='bx bxs-lock-alt absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500' />
                        </div>

                        <button type="submit" className="w-full h-10 bg-blue-600 text-white rounded-lg shadow-md hover:bg-black hover:scale-105 transition-all duration-0">
                            Register Now
                        </button>

                        <p onClick={() => navigate('/reset-password')} className='mt-4 text-indigo-500 cursor-pointer'>Forgot Password</p>

                        <p className="text-sm text-gray-600 my-6">Or Register With Social Platforms</p>

                        <div className="flex justify-center gap-4">
                            {['bxl-discord-alt', 'bxl-google'].map((icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-full text-2xl text-gray-700 shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-blue-600 hover:scale-105 transition-all duration-0"
                                >
                                    <i className={`bx ${icon}`} />
                                </a>
                            ))}
                        </div>

                    </form>
                </div>

                {/* Toggle Container */}
                <div className="absolute w-full h-full overflow-hidden">
                    {/* Sliding Background */}
                    <div className={`absolute w-[300%] md:w-[300%] h-full bg-blue-600 rounded-none md:rounded-[150px] overflow-hidden transition-all duration-1000 ease-in-out ${isActive ? 'left-1/2' : '-left-[250%]'
                        }`} />

                    {/* Toggle Panels */}
                    <div className={`absolute w-full md:w-1/2 h-full overflow-hidden flex flex-col items-center justify-center text-white z-20 transition-all duration-500 ease-in-out ${isActive ? '-left-full md:-left-1/2 delay-300' : 'left-0 delay-700'
                        }`}>
                        <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center">Hello, Players</h1>
                        <p className="mb-5">Don't Have An Account?</p>
                        <button onClick={() => setIsActive(true)}
                            className="w-40 h-11 bg-transparent border-2 border-white rounded-lg hover:bg-gray-800 hover:border-blue-600 hover:scale-105 transition-all duration-300">
                            Register
                        </button>
                    </div>

                    <div className={`absolute w-full md:w-1/2 h-full flex flex-col items-center justify-center text-white z-20 transition-all duration-1000 ease-in-out ${isActive ? 'right-0 delay-700' : '-right-full md:-right-1/2 delay-300'
                        }`}>
                        <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center">Welcome Back!</h1>
                        <p className="mb-5">Already Have An Account?</p>
                        <button onClick={() => setIsActive(false)}
                            className="w-40 h-11 bg-transparent border-2 border-white rounded-lg hover:bg-gray-800 hover:border-blue-600 hover:scale-105 transition-all duration-1000">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;