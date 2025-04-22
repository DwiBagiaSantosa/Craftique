import React from 'react'

const FormSelect = ({label, name, list, value, disabled, onChange, placeholder, register}) => {
  return (
    <div className='form-control'>
        <label htmlFor="" className='label'>
            <span className='capitalize label-text'>{label}</span>
        </label>
        <select {...(register ? register(name) : {})} name={name} className='select select-bordered disabled:bg-slate-100' onChange={onChange} disabled={disabled} >
            {/* {placeholder && <option disabled value="" selected>{placeholder}</option>} */}
            
            {list.map((item) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    </div>
  )
}

export default FormSelect