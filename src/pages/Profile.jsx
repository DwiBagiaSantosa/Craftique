import { useEffect, useState } from 'react'
import FormInput from '../components/Form/FormInput'
import FormSelect from '../components/Form/FormSelect'
// import imageNotAvailable from '../assets/Image_not_available.png';
import profileDefault from '../assets/profileDefault.png';
import { useDispatch, useSelector } from 'react-redux';
// import { updateProfile } from '../features/userSlice';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Form, useForm } from 'react-hook-form';
import { profileSchema } from '../utils/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from '../services/authService';
import { useLoaderData, useRevalidator } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    
    const revalidatior = useRevalidator();

    const user = useLoaderData()
    // console.log("🚀 ~ Profile ~ user:", user)

    // const user = useSelector((state) => state.userState.user)
    // const { name, lastName, dateOfBirth, gender, email, phoneNumber, image, dummy } = user

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            lastName: user.lastName,
            dateOfBirth: dayjs(user.dateOfBirth).format("YYYY-MM-DD"),
            gender: user.gender,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }
    })

    const genders = ["Male", "Female"];

    const onSubmit = async(values) => {
        // console.log("🚀 ~ onSubmit ~ values:", values)
        try {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("lastName", values.lastName);
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("gender", values.gender);
          formData.append("email", values.email);
          formData.append("phoneNumber", values.phoneNumber);
          
          if(values.image && values.image.length > 0) {
            formData.append("image", values.image[0]);
          }

          await updateProfile(user._id, formData)
          setIsEditing(false);

          revalidatior.revalidate()
          toast.success("Profile updated successfully")
        } catch (error) {
          console.log("🚀 ~ onSubmit ~ error:", error)
          toast.error("Failed to update profile")
        }
    }

    useEffect(() => {
        document.title = "Craftique | Profile" 
    }, [])
    

    console.log("errors", errors);

  return (
    <>
      <div className="w-full min-h-screen bg-white pt-[170px] pb-12 ">
        <div className="max-w-[1230px] mx-auto px-[25px] shadow-lg rounded-xl">
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-5 ">
              <img
                src={user.image.url ? user.image.url : profileDefault}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover border border-red-200"
              />
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                reset({
                  name: user.name,
                  lastName: user.lastName,
                  dateOfBirth: dayjs(user.dateOfBirth).format("YYYY-MM-DD"),
                  gender: user.gender,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                })
                setIsEditing(!isEditing)
              }}
              type="button"
              className={`btn ${
                isEditing ? "btn-outline" : ""
              } w-20 justify-self-end`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 py-8"
          >
            <FormInput
              name="name"
              label="First Name"
              type="text"
              // defaultValue={name}
            //   onChange={handleChange}
              disabled={!isEditing}
              register={register}
              error={errors.name?.message}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              // defaultValue={lastName}
              // onChange={handleChange}
              disabled={!isEditing}
              register={register}
              error={errors.lastName?.message}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              // defaultValue={email}
            //   onChange={handleChange}
              disabled
              register={register}
              error={errors.email?.message}
            />
            <FormInput
              name="phoneNumber"
              label="Phone Number"
              type="text"
              // defaultValue={phoneNumber}
            //   onChange={handleChange}
              disabled={!isEditing}
              register={register}
              error={errors.phoneNumber?.message}
            />
            <FormSelect
              name="gender"
              label="Gender"
              list={genders}
              // value={user.gender}
            //   onChange={handleChange}
              disabled={!isEditing}
              placeholder="You Have Not Set Your Gender"
              register={register}
            />
            <FormInput
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              // defaultValue={dayjs(dateOfBirth).format("YYYY-MM-DD")}
            //   onChange={handleChange}
              disabled={!isEditing}
              register={register}
              error={errors.dateOfBirth?.message}
            />
            
            {isEditing && (
              <>
                <fieldset className="fieldset mt-1">
                  <legend className="fieldset-legend text-sm mb-1 ml-1">Change your profile picture</legend>
                  <input {...register("image")} name="image" type="file" className="file-input" />
                  <label className="label">Max size 2MB</label>
                </fieldset>
                <div className='col-span-2 flex justify-center'>
                  <button type="submit" className="mx-auto btn btn-primary">Save</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      {/* <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto  gap-6 px-[75px]'>
            <form onSubmit={handleSave} >
                <div className='flex justify-center h-[200px] '>
                    <img src={image ? image : imageNotAvailable} alt="Profile Picture" className='border border-[#867F87]' />
                </div>
                <FormInput name="name" label="Name" type="text" value={formData.name} onChange={handleChange} disabled={!isEditing} />
                <FormInput name="lastName" label="Last Name" type="text" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
                
                { !isEditing ? (
                    <>
                        <FormInput name="dateOfBirth" label="Date of Birth" type="text" placeholder="You Have Not Set Your Date of Birth" value={formData.gender} disabled />
                        <FormInput name="gender" label="Gender" type="text" placeholder="You Have Not Set Your Gender" value={formData.gender} disabled />
                    </>
                ) : (
                    <>
                        <FormInput name="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth ? dayjs(formData.dateOfBirth).format('YYYY-MM-DD') : ''} onChange={handleChange} disabled={!isEditing} />
                        <FormSelect name="gender" label="Gender" list={genders} value={formData.gender ? formData.gender : ''} onChange={handleChange} disabled={!isEditing} placeholder="You Have Not Set Your Gender" />
                    </>
                )}
                <FormInput name="email" label="Email" type="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
                <FormInput name="phoneNumber" label="Phone Number" type="text" value={formData.phoneNumber ? formData.phoneNumber : ''} onChange={handleChange} disabled={!isEditing} placeholder="You Have Not Set Your Phone Number" />
                <div className='flex mt-4 justify-between'>
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
      </div> */}
    </>
  );
}

export default Profile
