import React from 'react'
import AdminNavbar from '../../../components/Navbar/AdminNavbar'

function AdminHome() {
  return (
    <div className=' '>
      <AdminNavbar/>
      ADMIN HOME
      <div className=' w-auto py-10 mx-8 rounded-lg p-5  border-2 border-cyan-300   h-auto bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 '>
        hello
        <h1 className='text-2xl bg-transparent '>HELLO ADMIN</h1>
        {/* <h3 className='  text-2xl'>WELCOME TO DASHBOARD</h3> */}
        {/* <h3 className='  text-2xl'>Congratulation ,You Have Some Good News</h3> */}
      </div>
    </div>
  )
}

export default AdminHome
