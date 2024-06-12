import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import getUsers from '../actions/getUser'
import UsersList from './components/UsersList'

const UsersLayout = async ({ children }) => {
  const users = await getUsers()
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