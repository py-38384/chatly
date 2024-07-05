import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import getUsers from '../actions/getUser'
import UsersList from './components/UsersList'
import getCurrentUser from '../actions/getCurrentUser'
import getBlockedUser from '../actions/getBlockedUser'

const UsersLayout = async ({ children }) => {
  const currentUser = await getCurrentUser()
  const users = await getUsers()
  const blockedUsers = await getBlockedUser()
  return (
    <Sidebar>
      <div className='h-full'>
        <UsersList items={users} user={currentUser} blockedUsers={blockedUsers} />
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout