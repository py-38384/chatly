'use client'

import Button from "@/app/components/Button"
import Modal from "@/app/components/Modal"
import useConversation from "@/app/hooks/useConversation"
import { Dialog, DialogTitle } from "@headlessui/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { FiAlertTriangle } from 'react-icons/fi'

const ConfirmModal = ({ isOpen, onClose }) => {
    const router = useRouter()
    const { conversationId } = useConversation()
    const [ isLoading, setIsLoading ] = useState(false)
    const onDelete = useCallback(() => {
        setIsLoading(true)
        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose()
            router.push('/conversations')
            router.refresh()
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false))
    }, [conversationId, router, onClose])
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="p-5"
    >
        <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <FiAlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle as="h3" className='text-base font-semibold leading-6 text-gray-900'>
                    Delete Conversation
                </DialogTitle>
                <div className="my-4">
                    <p className="text-sm text-gray-500">Are you sure you want to delete this conversation? this action cannot be undone.</p>
                </div>
            </div>
        </div>
        <div className="flex max-sm:justify-center flex-row-reverse  max-sm:mt-6 ">
            <Button disabled={isLoading} danger onClick={onDelete}>Delete</Button>
            <Button className="border hover:bg-slate-300 border-gray-300 mr-2" disabled={isLoading} secondary onClick={onClose}>Cancel</Button>
        </div>
    </Modal>
  )
}

export default ConfirmModal