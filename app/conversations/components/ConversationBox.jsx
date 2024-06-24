'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation, Message, User } from '@prisma/client'
import ConversationModal from './ConversationModal'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import useOtherUser from '@/app/hooks/useOtherUser'
import clsx from 'clsx'
import AvatarGroup from '@/app/components/AvatarGroup'
import Avatar from '@/app/components/Avatar'

const ConversationBox = ({ data, selected }) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()
  const [ isOpen, setIsOpen ] = useState(false)

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }
    const seenArray = lastMessage.seen || []
    if (!userEmail) {
      return false
    }
    return seenArray.filter(user => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }
    if (lastMessage?.body) {
      return lastMessage.body
    }
    return "Started a conversations"
  }, [lastMessage])

  return (
      <>
      <ConversationModal
        otherUser={otherUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className='flex'>
        <div className={clsx('w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3', selected ? 'bg-neutral-100' : 'bg-white')} onClick={handleClick}>
          {data.isGroup ? (
            <AvatarGroup users={data.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='min-w-0 flex-1'>
            <div className='focus: outline-none'>
              <div className='flex justify-between items-center mb-1'>
                <p className='text-md font-medium to-gray-900'>
                  {data.name || otherUser.name}
                </p>
                {lastMessage?.createdAt && (
                  <p className='text-xs to-gray-400 font-light'>{format(new Date(lastMessage.createdAt), 'p')}</p>
                )}
              </div>
              {/* text-black font-medium */}
              <p className={clsx('truncate text-sm', hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
                {lastMessageText}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="hover:bg-neutral-100 rounded-full" onClick={() => setIsOpen(true)}>
            <HiEllipsisVertical className="text-2xl"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConversationBox