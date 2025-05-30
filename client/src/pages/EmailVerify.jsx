import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const EmailVerify = () => {
  
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handelKeyDown = (e, index) =>{
    if(e.key == 'Backspace' && e.target.value == '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handelPeast = (e)=>{
    const peate = e.clipboardData.getData('text')
    const peastArray = peate.split('');
    peastArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault(); // Fixed typo here
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
  
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
  
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
     isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-300'>
         <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

         <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>

        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify Otp</h1>

        <p className='text-center mb-6 text-indigo-300'>Enter the 6-degit code send to your email</p>

        <div className='flex justify-between mb-8' onPaste={handelPeast}>
            {Array(6).fill(0).map((_, index)=>(
              <input type="text" maxLength={1} key={index} required
              className='w-12 h-12 bg-[#333A5c] text-white text-center text-xl rounded-md'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e)=> handelKeyDown(e, index)}

              />

            ))}
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button>


         </form>
    </div>
  )
}

export default EmailVerify
