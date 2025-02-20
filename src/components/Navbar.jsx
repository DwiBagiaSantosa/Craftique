import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logos/craftique-logo3.svg'
import { BsCart3 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import customAPI from '../api'
import { logout } from '../features/userSlice'
import { toast } from 'react-toastify'



const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const user = useSelector((state) => state.userState.user)
    const inCart = useSelector((state) => state.cartState.numItemsInCart)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await customAPI.get('/auth/logout')

            
            dispatch(logout())
            // dispatch(clearCart())
            toast.success('Log out successfully')
            navigate('/')
        } catch (error) {
            dispatch(logout())
            // dispatch(clearCart())
            toast.error('Log out failed')
            navigate('/')
        }
    }

    // Handle Search Submission
    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            toast.warn('Please enter a search term');
            return;
        }

        // Construct the search parameters
        const params = new URLSearchParams({ name: searchQuery });

        // console.log("🚀 ~ handleSearch ~ params:", params.toString())
        // Navigate to the products page with the search query
        navigate(`/products?${params.toString()}`);
    };

  return (
    <>
        <nav className='fixed top-[30px] inset-x-0 z-50 max-w-[1380px] w-full mx-auto px-[75px]'>
            <nav className='flex justify-between items-center w-full mx-auto bg-primary p-5 rounded-3xl'>
                <Link to='/'>
                    <img src={logo} alt="" className="inline-flex h-[50px]" />
                </Link>
                <form onSubmit={handleSearch}>
                    <label className="input bg-white flex items-center rounded-2xl">
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  className="grow" placeholder="Search Product" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                    </label>
                </form>

                <div className='flex space-x-3 items-center'>
                    {user ? (
                    <>
                    <NavLink to={'/cart'} className='btn bg-primary btn-circle btm-md border-none' >
                        <div className='indicator'>
                            <BsCart3 className='text-2xl text-white'/>
                            <span className='badge badge-xs indicator-item badge-white'>{inCart}</span>
                        </div>
                    </NavLink>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn text-white font-normal">Hello, {user.name.split(' ')[0]}</div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                            <li><Link to={'/profile'} >Profile</Link></li>
                            <li><Link to={'/orders'} >Orders</Link></li>
                            {user.role === 'admin' && <li><Link>Admin</Link></li>}
                            
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                    </>
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
