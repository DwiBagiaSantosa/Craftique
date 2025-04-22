import React from 'react'

const FormInput = ({label, name, type, placeholder, disabled, register, error}) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input {...(register ? register(name) : {})} type={type} name={name} className='input input-bordered bg-slate-100 disabled:bg-slate-100' placeholder={placeholder} disabled={disabled} />
      {error && (
        <div className="w-full p-1 bg-red-500 rounded-lg mt-2 text-center">
          <span className='text-white'>*{error}</span>
        </div>
      )}
    </div>
  )
}

export default FormInput
