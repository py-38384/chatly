'use client'

import { useState } from 'react'
import Avatar from "@/app/components/Avatar"
import GlobalModal from "./GlobalModal";
import axios from 'axios';
import { CgUnblock } from "react-icons/cg";
import { useRouter } from 'next/navigation';

const BlockedUserBox = ({ data, setBlockUsers, setUsers }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleUnblock = () => {
        axios.post('/api/global', {
            userId: data.id,
            objective: 'unblock'
        })
        .then((response) => {
          const otherUser = response.data
          setBlockUsers((current) => current.filter((item) => item.id !== otherUser.id))
          setUsers((current) => [otherUser, ...current])
        })
        .catch((e) => console.log(e))
    }
  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <GlobalModal
        user={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="flex flex-row gap-1">
        <div className="w-full relative flex items-center space-x-3 bg-white p-3 rounded-lg transition">
          <div onClick={() => setIsOpen(true)} className="hover:opacity-50 cursor-pointer">
            <Avatar user={data} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <div className="flex justify-between items-center mb-1">
                <p onClick={() => setIsOpen(true)} className="text-sm font-medium text-gray-900 hover:underline cursor-pointer">
                  {data.name}
                </p>
              </div>
            </div>
          </div>
            <div className="flex items-center justify-center gap-1">
              <div onClick={handleUnblock} className="hover:bg-[#f9f4f2] p-2 rounded-full text-gray-600 ">
                <CgUnblock size={22} className="text-2xl" />
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default BlockedUserBox