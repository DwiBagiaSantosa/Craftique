import React, { useEffect, useState } from 'react'
import FormInput from '../components/Form/FormInput'
import FormSelect from '../components/Form/FormSelect'
import imageNotAvailable from '../assets/image_not_available.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/userSlice';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const Profile = () => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);

    const user = useSelector((state) => state.userState.user)
    const { name, dateOfBirth, gender, email, phoneNumber, image } = user

    const [formData, setFormData] = useState({
        name: name || '',
        dateOfBirth: dateOfBirth || '',
        gender: gender || '',
        email: email || '',
        phoneNumber: phoneNumber || '',
    });

    const genders = ["Male", "Female"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSave = async(e) => {
        e.preventDefault();
        // console.log("Save button clicked. isEditing:", !isEditing);
        const updatedData = {
            name: e.target.name.value,
            dateOfBirth: e.target.dateOfBirth.value,
            gender: e.target.gender.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
        };

        try {
            await dispatch(updateProfile({ userId: user._id, userData: updatedData })).unwrap();
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        }

        // console.log("updatedData:", updatedData);

        setIsEditing(false);
    }

    useEffect(() => {
        document.title = "Craftique | Profile" 
    }, [])

  return (
    <>
      <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto  gap-6 px-[75px]'>
            <form onSubmit={handleSave} >
                <div className='flex justify-center h-[200px] '>
                    <img src={image ? image : imageNotAvailable} alt="Profile Picture" className='border border-[#867F87]' />
                </div>
                <FormInput name="name" label="Name" type="text" defaultValue={formData.name} onChange={handleChange} disabled={!isEditing} />
                
                { !isEditing ? (
                    <>
                        <FormInput name="dateOfBirth" label="Date of Birth" type="text" placeholder="You Have Not Set Your Date of Birth" defaultValue={formData.gender} disabled />
                        <FormInput name="gender" label="Gender" type="text" placeholder="You Have Not Set Your Gender" defaultValue={formData.gender} disabled />
                    </>
                ) : (
                    <>
                        <FormInput name="dateOfBirth" label="Date of Birth" type="date" defaultValue={formData.dateOfBirth ? dayjs(formData.dateOfBirth).format('YYYY-MM-DD') : null} onChange={handleChange} disabled={!isEditing} />
                        <FormSelect name="gender" label="Gender" list={genders} value={formData.gender ? formData.gender : ''} onChange={handleChange} disabled={!isEditing} placeholder="You Have Not Set Your Gender" />
                    </>
                )}
                <FormInput name="email" label="Email" type="email" defaultValue={formData.email} onChange={handleChange} disabled={!isEditing} />
                <FormInput name="phoneNumber" label="Phone Number" type="text" defaultValue={formData.phoneNumber ? formData.phoneNumber : null} onChange={handleChange} disabled={!isEditing} placeholder="You Have Not Set Your Phone Number" />
                <div className='flex justify-center mt-4 justify-between'>
                    {isEditing && 
                    <>
                        <button type='button' onClick={() => setIsEditing(false)} className='btn btn-danger w-28'>Cancel</button>
                        <button type='submit' className='btn btn-success text-white w-28'>Save</button>
                    </>
                    }
                </div>
            </form>
            
            {!isEditing &&
                <div className='flex justify-center '>
                    <button type='button' className='btn btn-danger w-28' onClick={() => {setIsEditing(true) 
                        // console.log("Edit button clicked. isEditing:", !isEditing);
                    }} >Edit</button>
                </div>    
            }
        </div>
      </div>
    </>
  )
}

export default Profile
