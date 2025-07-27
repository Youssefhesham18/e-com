import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData,logOut}) {
  return (
    <div>
      <Navbar logOut={logOut} userData={userData}/>
      <div className='container'>
      <Outlet/>
      </div>

      {/* <Footer/> */}
    </div>
  )
}
