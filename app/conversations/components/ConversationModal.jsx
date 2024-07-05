import React, { useState } from 'react'
import Modal from '@/app/components/Modal'
import Image from 'next/image'

const ConversationModal = ({ otherUser, isOpen, onClose }) => {
    if(otherUser.provider === 'google'){
        otherUser.image = otherUser.image.slice(0,-4)+'1000'
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col lg:flex-row lg:justify-start items-center lg:items-start justify-center'>
                <div className='flex flex-col items-center justify-center lg:pr-3 p-4 gap-1  lg:border-r'>
                    <div><Image className='rounded-full' width={150} height={150} src={otherUser?.image || '/images/placeholder.png'}/></div>
                    <div className='text-slate-700 text-xl font-bold'>{otherUser.name}</div>
                    <div className='text-slate-700 text-sm'>{otherUser.email}</div>
                </div>
                <div className='flex flex-col items-center lg:items-start justify-center lg:p-0 pb-2 lg:pl-2 gap-1'>
                    <div className='text-red-500 hover:underline cursor-pointer'>Delete conversation</div>
                    <div className='text-red-500 hover:underline cursor-pointer'>Unfriend User</div>
                    <div className='text-red-500 hover:underline cursor-pointer'>Block User</div>
                </div>
            </div>
        </Modal>
    )
}

export default ConversationModal