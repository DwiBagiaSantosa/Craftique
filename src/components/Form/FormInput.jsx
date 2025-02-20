import React from 'react'

const FormInput = ({label, name, type, defaultValue, placeholder, disabled}) => {
  return (
    <div className='form-control'>
      <label htmlFor="email" className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input type={type} name={name} defaultValue={defaultValue} className='input input-bordered bg-slate-100' placeholder={placeholder} disabled={disabled} />
    </div>
  )
}

export default FormInput
