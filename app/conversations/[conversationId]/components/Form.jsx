'use client'
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import { CldUploadButton } from 'next-cloudinary'

const Form = () => {
    const { conversationId } = useConversation()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            message: ''
        }
    })
    const onSubmit = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post('/api/messages',{
            ...data,
            conversationId
        })
    }
    const handleUpload = (result) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
        <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='i5t3avbb' >
            <HiPhoto size={30} className='text-[#772f12]'/>
        </CldUploadButton>
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
            <MessageInput id="message" type="text" register={register} errors={errors} placeholder="Write a message" required />
            <button type='submit' className='rounded-full p-2 bg-[#772f12] cursor-pointer hover:bg-[#60250e] transition'>
                <HiPaperAirplane size={18} className='text-white'/>
            </button>
        </form>
    </div>
  )
}

export default Form