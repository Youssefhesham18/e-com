// src/Component/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


export default function Layout({ userData, logOut }) {
  return (
    <>
      <Navbar userData={userData} logOut={logOut} />
      <div className="container py-3">
        <Outlet />
      </div>
      <Footer /> 
    </>
  );
}
