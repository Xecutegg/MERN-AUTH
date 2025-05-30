import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Header = () => {

    const {userData} = useContext(AppContent)
    console.log(userData)

    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
            <img src={assets.logo} alt="" className='w-36 h-36 p-2 rounded-full mb-2' />

            <h1 className='flex item-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Player!'}

                <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
            </h1>


            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome To Our App</h2>

            <p className='mb-8 max-w-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repellendus incidunt, nesciunt ex illo nemo blanditiis! Ipsa reiciendis ab consectetur.</p>

            <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
        </div>
    )
}

export default Header
