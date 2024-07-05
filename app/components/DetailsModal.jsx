
import React from 'react'
import Modal from '@/app/components/Modal'
import Image from 'next/image'

const DetailsModal = ({ user, isOpen, onClose }) => {
    if(user.provider === 'google'){
        user.image = user.image.slice(0,-4)+'1000'
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='flex flex-col lg:flex-row items-center justify-center'>
                <div className='flex flex-col items-center justify-center lg:pr-3 p-4 gap-1'>
                    <div><Image className='rounded-full' width={150} height={150} src={user?.image || '/images/placeholder.png'}/></div>
                    <div className='text-slate-700 text-xl font-bold'>{user.name}</div>
                    <div className='text-slate-700 text-sm'>{user.email}</div>
                </div>
            </div>
        </Modal>
    )
}

export default DetailsModal