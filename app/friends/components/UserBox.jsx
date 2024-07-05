'use client'

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/LoadingModal"
import { HiEllipsisVertical } from "react-icons/hi2";
import axios from "axios"
import { useRouter } from "next/navigation"
import FriendsModel from "./FriendsModel";
import { useCallback, useState } from "react"

const UserBox = ({ data }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = useCallback(() => {
    setIsLoading(true)
    axios.post('/api/conversations', {
      userId: data.id
    })
    .then(({data}) => {
        router.push(`/conversations/${data.id}`)
    })
    .finally(() => {
      setIsLoading(false)
    })
  },[data, router])
  return (
    <>
      <FriendsModel
        otherUser={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      {isLoading && (
        <LoadingModal />
      )}
      <div className="flex flex-row gap-1">
        <div onClick={handleClick} className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
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
          <div onClick={() => setIsOpen(true)} className="hover:bg-neutral-100 rounded-full">
            <HiEllipsisVertical className="text-2xl"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox