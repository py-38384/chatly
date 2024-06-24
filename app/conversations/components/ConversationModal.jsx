import React, { useState } from 'react'
import Modal from '@/app/components/Modal'
import Image from 'next/image'

const ConversationModal = ({ otherUser, isOpen, onClose }) => {
    console.log(otherUser)
    let userImage = otherUser.image.slice(0,-4);
    userImage+='500' 
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <div><Image width={200} height={200} src={otherUser.image}/></div>
                <div>{otherUser.name}</div>
            </div>
            <div>Delete conversation</div>
            <div>Unfriend User</div>
            <div>Block User</div>
        </Modal>
    )
}

export default ConversationModal