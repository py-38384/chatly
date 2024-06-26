'use client'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConversationBox from './ConversationBox'
import { MdOutlineGroupAdd } from 'react-icons/md' 
import GroupChatModal from './GroupChatModal'
import useConversation from '@/app/hooks/useConversation'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/libs/pusher'

const ConversationList = ({ initialItems, users }) => {
  const session = useSession()
  const {conversationId, isOpen} = useConversation()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(()=>{
    if (!pusherKey){
      return
    }
    pusherClient.subscribe(pusherKey)
    const newHandler = (conversation) => {
      setItems((current) => {
        if(find(current, {id: conversation.id})){
          return current
        }
        return [conversation, ...current]
      })
    }

    const updateHandler = (conversation) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages: conversation.messages
          }
          }
        return currentConversation
      }))
    }

    const removeHandler = (conversation) => {
      setItems((current) => {
        return [...current.filter((currentConver) => currentConver.id !== conversation.id)]
      })
      if(conversationId === conversation.id){
        router.push('/conversations')
      }
    }

    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', removeHandler)
    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:remove', removeHandler)
    }
  }, [pusherKey, conversationId, router])
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside className={clsx('fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',isOpen? 'hidden': 'block w-full left-0')}>
        <div className='px-5'>
          <div className='flex items-center justify-between mb-4 pt-4'>
            <div>
              Messages
            </div>
            <div onClick={() => setIsModalOpen(true)} className='rounded-full p-2 bg-[#f9f4f2] text-gray-600 cursor-pointer hover:opacity-75 transition'>
                <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.length > 0? items.map((items)=>(
            <ConversationBox key={items.id} data={items} selected={conversationId === items.id}/>
          )): (
            <div>No Conversation</div>
          )}
        </div>
      </aside>
    </>
  )
}

export default ConversationList