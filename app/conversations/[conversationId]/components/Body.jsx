'use client'
import useConversation from '@/app/hooks/useConversation'
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'

const Body = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef()
  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef.current.scrollIntoView()

    const messageHandler = async (message) => {
      await axios.post(`/api/conversations/${conversationId}/seen`)
      setMessages((current) => {
        if(find(current, {id: message.id})){
          return current
        }
        return [...current, message]
      })
      bottomRef.current.scrollIntoView()
    }

    const updateMessageHandler = (updatedMessage) => {
      setMessages((current) => current.map((currentMessage) => {
          if(currentMessage.id === updatedMessage.id){
            console.log('Updated massage Object -',updatedMessage)
            return updatedMessage
          }
          return currentMessage
      }))

      bottomRef.current.scrollIntoView()
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new',messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }

  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages && messages?.length > 0? messages.map(( message, i ) => (
          <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      )): (
        <div className='flex items-center justify-center h-full'><h1 className='font-semibold text-xl'>No message found</h1></div>
      )}
      <div ref={bottomRef} className='pt-24'/>
    </div>
  )
}

export default Body