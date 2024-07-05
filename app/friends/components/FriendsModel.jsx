'use client'

import React, { useState } from 'react'
import Modal from '@/app/components/Modal'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const FriendsModel = ({ otherUser, isOpen, onClose }) => {
    const router = useRouter()
    const handleUnfriend = () => {
        axios.post('/api/friends/unfriend',{
            userId: otherUser.id
        })
        .then(({data}) => {
            router.refresh()
            console.log('Unfriend -\n',data)
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {})
    }
    const handlebBlockUser = () => {
        axios.post('/api/friends/block',{
            userId: otherUser.id
        })
        .then(({data}) => {
            router.refresh()
            console.log('Block -\n',data)
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {})
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col lg:flex-row lg:justify-start items-center lg:items-start justify-center'>
                <div className='flex flex-col items-center justify-center lg:pr-3 p-4 gap-1  lg:border-r'>
                    <div><Image className='rounded-full' width={150} height={150} src={otherUser?.image || '/images/placeholder.png'} alt='User-Icon'/></div>
                    <div className='text-slate-700 text-xl font-bold'>{otherUser.name}</div>
                    <div className='text-slate-700 text-sm'>{otherUser.email}</div>
                </div>
                <div className='flex flex-col items-center lg:items-start justify-center lg:p-0 pb-2 lg:pl-2 gap-1'>
                    <div onClick={handleUnfriend} className='text-red-500 hover:underline cursor-pointer'>Unfriend User</div>
                    <div onClick={handlebBlockUser} className='text-red-500 hover:underline cursor-pointer'>Block User</div>
                </div>
            </div>
        </Modal>
    )
}

export default FriendsModel