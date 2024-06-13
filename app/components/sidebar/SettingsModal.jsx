import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../input/Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '../Button'

const SettingsModal = ({ currentUser, isOpen, onClose }) => {
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })
    const image = watch('image')
    const handleUpload = ( result ) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }
    const onSubmit = ( data ) => {
        setIsLoading(true)
        axios.post('/api/settings', data)
        .then(() => {
            router.refresh()
            onClose()
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))

    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Profile
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Edit your profile
                        </p>
                        <div className='mt-10 flex flex-col gap-y-8'>
                            <Input 
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                id='name'
                                label='Name'
                                required
                            />
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>Photo</label>
                                <div className='mt-2 flex items-center gap-x-3'>
                                    <Image 
                                        width='48' 
                                        height='48' className='rounded-full' 
                                        src={image || currentUser?.image || '/images/placeholder.png'}
                                        alt='Avatar'
                                    />
                                    <CldUploadButton 
                                        options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='i5t3avbb' 
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type='button'
                                            className='hover:underline'
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <Button 
                            className='border hover:bg-slate-300 border-gray-300' 
                            disabled={isLoading} 
                            secondary 
                            type='button'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button 
                            disabled={isLoading} 
                            onClick={onClose}
                            type='submit'
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal