import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import getFriends from '../actions/getFriends'
import UsersList from './components/UsersList'

const UsersLayout = async ({ children }) => {
  const users = await getFriends()
  return (
    <Sidebar>
      <div className='h-full'>
        <UsersList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout