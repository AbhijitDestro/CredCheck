import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-5 lg:px-20 py-5'>
        <Link to="/">
        <div className='flex items-center gap-2'>
            <img src="/logo.png" alt="logo" className='w-12 h-12'/>
            <h1 className='text-3xl font-bold'>CredCheck</h1>
        </div>
        </Link> 
        <div className='hidden lg:flex items-center'>
            <ul>
                <li className='flex items-center gap-20'>
                    <Link to="/verify-credentials" className='text-white hover:text-[#f53924] text-xl'>Verify Credentials</Link>
                    <Link to="/download" className='text-white hover:text-[#f53924] text-xl'>Download</Link>
                    <Link to="/contact" className='text-white hover:text-[#f53924] text-xl'>Contact</Link>
                    <Link to="/about" className='text-white hover:text-[#f53924] text-xl'>About</Link>
                </li>
            </ul>
        </div>
        <div className='hidden lg:flex items-center gap-4'>
            <button className='border border-white text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-white hover:text-black'>
                Login
            </button>
            <button className='bg-[#923830] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#f53924]'>
                Get Started
            </button>
        </div>
    </div>
  )
}

export default Navbar