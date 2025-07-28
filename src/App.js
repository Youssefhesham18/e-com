import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './Component/Home/Home';
import Layout from './Component/Layout/Layout';
import Products from './Component/Products/Products';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import Category from './Component/Category/Category';
import Profile from './Component/Profile/Profile';
import AllCategories from './Component/Category/AllCategories';
import Register from './Component/Register/Register';
import jwt_decode from "jwt-decode";
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetPassword from './Component/ForgetPassword/ResetPassword';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import { CartContextProvider } from './Component/CartDetails/CartContext';
import CartDetails from './Component/CartDetails/CartDetails';
import Checkout from './Component/Checkout/Checkout.jsx';
import AllOrders from './Component/AllOrders/AllOrders';

export default function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const data = jwt_decode(token);
      saveUserData(data);
    }
  }, []);

  function saveUserData(data) {
    setUserData(data);
  }

  function ProtectRouting(props) {
    if (localStorage.getItem("token")) {
      return props.children;
    } else {
      return <Navigate to="/Login" />;
    }
  }


  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setUserData(null);
    window.location.pathname = '/Login'; 
  }

  const routes = createBrowserRouter([
    {
      path: "", 
      element: <Layout userData={userData} logOut={logOut} />, 
      children: [
        { path: "Home", element: <ProtectRouting><Home /></ProtectRouting> },
        { path: "Login", element: <Login saveUserData={saveUserData} /> },
        {
  index: true,
  element: localStorage.getItem("token") ? (
    <Navigate to="/Home" />
  ) : (
    <Navigate to="/Login" />
  ),
},

        { path: "CartDetails", element: <ProtectRouting><CartDetails /></ProtectRouting> },
        { path: "Checkout/:cartid", element: <ProtectRouting><Checkout /></ProtectRouting> },
        { path: "ProductDetails/:id", element: <ProtectRouting><ProductDetails /></ProtectRouting> },
        { path: "Profile", element: <ProtectRouting><Profile userData={userData} /></ProtectRouting> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "Categories", element: <ProtectRouting><AllCategories /></ProtectRouting> },
        { path: "Products", element: <ProtectRouting><Products /></ProtectRouting> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "Category", element: <ProtectRouting><Category /></ProtectRouting> },
        { path: "AllOrders", element: <ProtectRouting><AllOrders /></ProtectRouting> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  return (
    <CartContextProvider>
      <RouterProvider router={routes} />
    </CartContextProvider>
  );
}

