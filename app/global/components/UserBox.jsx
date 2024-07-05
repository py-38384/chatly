'use client'

import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/LoadingModal"
import { MdPersonAddAlt1 } from "react-icons/md"
import { BsFillPersonXFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import axios from "axios"
import DetailsModal from "@/app/components/DetailsModal";
import { useCallback, useState } from "react"

const UserBox = ({ data, currentUser, setCurrentUser, setBlockUsers, setUsers, setSearchUserItems }) => { 
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isRequested, setIsRequested] = useState(currentUser.friendRequestIds.includes(data.id))

  const handleFriendRequestSubmit = () => {
    axios.post('/api/global', {
      userId: data.id,
      objective: 'request'
    })
    .then((response)=>{
      const currentUser = response.data
      setCurrentUser(currentUser)
      setIsRequested(true)
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  const handleFriendRequestCancelSubmit = () => {
    axios.post('/api/global', {
      userId: data.id,
      objective: 'requestCancel'
    })
    .then((response)=>{
      const currentUser = response.data
      setCurrentUser(currentUser)
      setIsRequested(false)
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  const handleBlock = () => {
    axios.post('/api/global', {
      userId: data.id,
      objective: 'block'
    })
    .then((response) => {
      const updatedOtherUser = response.data
      setBlockUsers((current) => {
        return [...current, updatedOtherUser]
      })
      setUsers((current) => {
        return current.filter((item) => item.id !== data.id)
      })
      setSearchUserItems((current) => current.filter((item) => item.id !== updatedOtherUser.id))
    })
    .catch(() => {})
  }
  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <DetailsModal
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
          {isRequested ? (
            <div className="flex items-center justify-center gap-1">
              <div onClick={handleFriendRequestCancelSubmit} className="hover:bg-[#f9f4f2] p-2 rounded-full text-gray-600 ">
                <BsFillPersonXFill size={20} className="text-2xl" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <div onClick={handleBlock} className="hover:bg-[#f9f4f2] p-2 rounded-full text-gray-600 ">
                <MdBlock size={22} className="text-2xl" />
              </div>
              <div onClick={handleFriendRequestSubmit} className="hover:bg-[#f9f4f2] p-2 rounded-full text-gray-600 ">
                <MdPersonAddAlt1 size={22} className="text-2xl" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserBox