import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import getFriends from '../actions/getFriends'
import UsersList from './components/UsersList'
import getFriendRequests from '../actions/getFriendRequests'

const UsersLayout = async ({ children }) => {
  const friends = await getFriends()
  const friendRequests = await getFriendRequests()
  return (
    <Sidebar>
      <div className='h-full'>
        <UsersList friends={friends} requests={friendRequests} />
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout