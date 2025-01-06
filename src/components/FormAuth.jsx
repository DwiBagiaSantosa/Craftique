import React from 'react'
import { Form, Link } from 'react-router-dom'
import logo from '../assets/logos/craftique-logo4.svg'
import FormInput from './Form/FormInput'

const FormAuth = ({isRegister}) => {
  return (
    <>
        <div className='h-screen grid place-items-center'>
            <Form className='card w-[400px] p-8 bg-slate-100 shadow-lg flex flex-col gap-y-4'>
                <img src={logo} alt="" className="inline-flex h-[50px]" />
                <h3 className='text-center text-2xl font-medium mt-6'>Log in</h3>
                {isRegister ? (
                    <FormInput label="username" type="text" name="name" placeholder="Enter your username"/>
                ) : null}
                <FormInput label="Email" type="text" name="email" placeholder="Enter your email" />
                <FormInput label="Password" type="password" name="password" placeholder="Enter your password" />
                <div className='mt-4'>
                    <button type='submit' className='btn btn-primary btn-block'>{isRegister ? 'Register' : 'Log in'}</button>
                </div>
                {isRegister ? (
                    <p className='text-center'>
                        Already have an account? <Link to='/login' className='ml-2link link-hover link-accent capitalize'>Login</Link>
                    </p>
                ) : (
                    <p className='text-center'>
                        Don't have an account? <Link to='/register' className='ml-2link link-hover link-accent capitalize'>Register</Link>
                    </p>    
                )}
            </Form>
        </div> 
    </>
  )
}

export default FormAuth
