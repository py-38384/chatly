'use client'

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/LoadingModal"
import { HiX, HiCheck } from "react-icons/hi";
import axios from "axios"
import DetailsModal from "@/app/components/DetailsModal";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

const RequestUserBox = ({ data, setValue }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleConfirm = useCallback(() => {
    setIsLoading(true)
    axios.post('/api/friends/confirm', {
      userId: data.id
    })
    .then(({data}) => {
      console.log('Handle Request -',data)
      setValue(data.friendRequestFromIds)
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      setIsLoading(false)
    })
  },[data, router])

  const handleReject = useCallback(() => {
    setIsLoading(true)
    axios.post('/api/friends/reject', {
      userId: data.id
    })
    .then(({data}) => {
      console.log('Handle Reject -',data)
      router.refresh()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      setIsLoading(false)
    })
  },[data, router])
  return (
    <>
      <DetailsModal
        user={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      {isLoading && (
        <LoadingModal />
      )}
      <div className="flex flex-row gap-1">
        <div onClick={() => setIsOpen(true)} className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
          <Avatar user={data} />
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {data.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
            <div onClick={handleConfirm} className="hover:bg-neutral-100 rounded-full text-[#60250e]">
                <HiCheck className="text-2xl"/>
            </div>
            <div onClick={handleReject} className="hover:bg-neutral-100 rounded-full text-red-600">
                <HiX className="text-2xl"/>
            </div>
        </div>
      </div>
    </>
  )
}

export default RequestUserBox