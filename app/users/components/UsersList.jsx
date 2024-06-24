'use client'

import { useState } from "react"
import UserBox from "./UserBox"
import { useRouter } from "next/navigation"
import { MdOutlineSearch, MdPersonAddAlt1 } from "react-icons/md"
import { FaGlobeAmericas } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import SearchInput from "@/app/components/input/SearchInput"
import axios from "axios";

const UsersList = ({ items }) => {
    const router = useRouter()
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [query, setQuery] = useState('')
    const [searchUserItems, setSearchUserItems] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const searchSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('api/users/search',{query})
        .then(({data}) => {
            setSearchUserItems(data)
        })
        .catch(() => setIsLoading(false))
    }
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5">
            {isSearchOn? (
                <>
                    <div className="flex items-center justify-between py-4">
                        <div className="flex gap-2 w-full flex-row items-center justify-between">
                            <div>
                                <div onClick={() => setIsSearchOn(false)} className='rounded-full p-2 bg-[#f9f4f2] text-gray-600 cursor-pointer hover:opacity-75 transition'>
                                    <RxCross1 size={20} />
                                </div>
                            </div>
                            <div className="w-full">
                                <form onSubmit={searchSubmit}>
                                    <SearchInput value={query} onChange={setQuery} placeHolder='Search by name or email' />
                                </form>
                            </div>
                            <div>
                                <div onClick={searchSubmit} className='rounded-full p-2 bg-[#f9f4f2] text-gray-600 cursor-pointer hover:opacity-75 transition'>
                                    <MdOutlineSearch size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        searchUserItems ? (
                            <>
                                <div>{searchUserItems.length} user found</div>
                                {searchUserItems.length > 0? searchUserItems.map((item)=>(
                                        <UserBox
                                            key={item.id}
                                            data={item}
                                        />
                                )): (<div>No user found on this search query!</div>)}
                            </>
                        ): null
                    }
                </>
            ): (
                <>
                    <div className="flex items-center justify-between py-4">
                        <div>
                            Friends
                        </div>
                        <div className="flex gap-2 flex-row">
                            <div onClick={() => {router.push('/users/global')}} className='rounded-full p-2 bg-[#f9f4f2] text-gray-600 cursor-pointer hover:opacity-75 transition'>
                                <FaGlobeAmericas size={20} />
                            </div>
                            <div onClick={() => {}} className='rounded-full p-2 bg-[#f9f4f2] text-gray-600 cursor-pointer hover:opacity-75 transition'>
                                <MdPersonAddAlt1 size={20} />
                            </div>
                            <div onClick={() => {setIsSearchOn(true)}} className='rounded-full p-2 bg-[#f9f4f2] text-gray-600 cursor-pointer hover:opacity-75 transition'>
                                <MdOutlineSearch size={20} />
                            </div>
                        </div>
                    </div>
                    {items.length > 0? items.map((item)=>(
                        <UserBox
                            key={item.id}
                            data={item}
                        />
                    )): (<div>No user available</div>)}
                </>
            )}
        </div>
    </aside>
  )
}

export default UsersList