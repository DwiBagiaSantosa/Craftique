import React from 'react'
import { Form } from 'react-router-dom'
import logo from '../assets/logos/craftique-logo4.svg'

const FormAuth = () => {
  return (
    <>
        <div className='h-screen grid place-items-center'>
            <Form className='card w-96 p-8 bg-slate-100 shadow-lg flex flex-col gap-y-4'>
                <img src={logo} alt="" className="inline-flex h-[50px]" />
                <h4 className=''>Login</h4>
            </Form>
        </div> 
    </>
  )
}

export default FormAuth
