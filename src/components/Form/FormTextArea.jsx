import React from 'react'

const FormTextArea = ({label, name, defaultValue}) => {
  return (
    <label className='form-control'>
        <label htmlFor="" className='label'>
            <span className='label-text capitalize'>{label}</span>
        </label>
        <textarea className="textarea textarea-bordered" name={name} defaultValue={defaultValue}></textarea>
    </label>
  )
}

export default FormTextArea
