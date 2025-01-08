import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logos/craftique-logo3.svg'
import { BsCart } from 'react-icons/bs'

const Navbar = () => {
  return (
    <>
        <nav className='fixed top-[30px] inset-x-0 max-w-[1280px] w-full mx-auto px-[75px]'>
            <nav className='flex justify-between items-center w-full mx-auto bg-primary p-5 rounded-3xl'>
                <img src={logo} alt="" className="inline-flex h-[50px]" />
                <ul className='flex space-x-[30px] text-white font-normal'>
                    <li className='hover:text-secondary duration-300 transition-all'>
                        <Link>Shop</Link>
                    </li>
                    <li className='hover:text-secondary duration-300 transition-all'>
                        <Link>Categories</Link>
                    </li>
                </ul>

                <div className='flex space-x-3 items-center'>
                    <NavLink className='btn bg-white btn-circle btm-md' >
                        <div className='indicator'>
                            <BsCart className='text-xl '/>
                            <span className='badge badge-xs indicator-item badge-primary'>0</span>
                        </div>
                    </NavLink>
                    <Link to={'/login'} className='py-3 px-5 text-black rounded-full bg-white font-semibold'>Sign In</Link>
                    <Link to={'/register'} className='py-3 px-5 text-black rounded-full bg-white font-semibold'>Sign Up</Link>
                </div>
            </nav>
        </nav> 
    </>
  )
}

export default Navbar
