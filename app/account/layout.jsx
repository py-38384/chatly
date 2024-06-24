import React from 'react'
import AccountForm from './components/AccountForm'
import Sidebar from '../components/sidebar/Sidebar'
import getCurrentUser from '../actions/getCurrentUser'

const layout = async ({ children }) => {
  const currentUser = await getCurrentUser()
  return (
    <Sidebar>
      <div className='lg:border-r h-full lg:w-[50%]'>
        {children}
        <AccountForm currentUser={currentUser} />
      </div>
    </Sidebar>
  )
}

export default layout