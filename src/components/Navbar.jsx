import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logos/craftique-logo3.svg'
import { BsCart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import customAPI from '../api'
import { logout } from '../features/userSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const user = useSelector((state) => state.userState.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await customAPI.get('/auth/logout')
            dispatch(logout())
            toast.success('Log out successfully')
            navigate('/')
        } catch (error) {
            dispatch(logout())
            toast.error('Log out failed')
            navigate('/')
        }
    }

  return (
    <>
        <nav className='fixed top-[30px] inset-x-0 max-w-[1380px] w-full mx-auto px-[75px]'>
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
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn text-white font-normal">Hello, {user.name.length > 12 ? `${user.name.slice(0, 12)}...` : user.name}</div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                                <li><a>Profile</a></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to={'/login'} className='py-3 px-5 text-black rounded-full bg-white font-semibold'>Sign In</Link>
                            <Link to={'/register'} className='py-3 px-5 text-black rounded-full bg-white font-semibold'>Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </nav> 
    </>
  )
}

export default Navbar
