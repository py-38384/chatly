'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { FaCamera } from "react-icons/fa";
import LoadingModal from '@/app/components/LoadingModal'
import toast from 'react-hot-toast'
import { signOut, useSession } from 'next-auth/react'
import AccountFormInput from './AccountFormInput'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'

const AccountForm = ({ currentUser }) => {
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ name, setName ] = useState(currentUser?.name)
    const [ image, setImage ] = useState(currentUser?.image)
    if(currentUser){
        const handleUpload = ( result ) => {
            setImage(result?.info?.secure_url)
        }
        const onSubmit = (e) => {
            e.preventDefault()
            const data = {
                name,
                image
            }
            setIsLoading(true)
            axios.post('/api/settings', data)
            .then(({data}) => {
                setName(data.name)
                toast.success('Account successfully updated!')
                router.refresh()
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))

        }
        return (
            <div className='px-5 lg:w-full'>
                <form onSubmit={onSubmit}>
                    <div className='space-y-12'>
                        <div className='border-b border-gray-900/10 pb-12'>
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                Profile
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                                Edit your profile
                            </p>
                            <div className='mt-2 flex flex-col items-center gap-x-3'>
                                <div className='relative'>
                                    <Image 
                                        width='148' 
                                        height='148' className='rounded-full w-[148px] h-[148px]' 
                                        src={image || currentUser?.image || '/images/placeholder.png'}
                                        alt='Avatar'
                                        priority
                                    />
                                    <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='i5t3avbb'>
                                        <div
                                            disabled={isLoading}
                                            className='text-gray-600 absolute right-3 bottom-[30px] hover:text-gray-500'
                                        >
                                            <FaCamera size={25}/>
                                        </div>
                                    </CldUploadButton>
                                </div>
                            </div>
                            <div className='mt-10 flex flex-col gap-y-8'>
                                <AccountFormInput 
                                    disabled={isLoading}
                                    id='name'
                                    label='Name'
                                    value={name}
                                    setValue={setName}
                                    required
                                />
                            </div>
                        </div>
                        <div className='mt-6 flex flex-col items-center justify-end gap-x-6'>
                            <button 
                                disabled={isLoading} 
                                type='submit'
                                className='border w-full p-2 bg-[#772f12] hover:bg-[#60250e] focus-visible:outline-[#60250e] text-white'
                            >
                                Save
                            </button>

                            <button 
                                disabled={isLoading} 
                                type='submit'
                                onClick={() => signOut()}
                                className='border w-full p-2 my-4 flex items-center justify-center hover:bg-gray-100'
                            >
                                <HiArrowLeftOnRectangle className="text-red-600 h-6 w-6 shrink-0"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    )

    }else{
        return <LoadingModal/>
    }
}

export default AccountForm