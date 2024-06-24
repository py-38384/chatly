import React, { useState } from 'react'
import Modal from '@/app/components/Modal'
import Image from 'next/image'

const ConversationModal = ({ otherUser, isOpen, onClose }) => {
    if(otherUser.provider){
        otherUser.image = otherUser.image.slice(0,-4)+'1000'
    }
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