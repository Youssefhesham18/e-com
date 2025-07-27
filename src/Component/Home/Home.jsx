import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Mainslider from '../Mainslider/Mainslider';
import Category from '../Category/Category';

export default function Home() {
let baseUrl ="https://ecommerce.routemisr.com";
let [productlist, setProduct] = useState([])
 
 useEffect(()=>{
  getAllProduct()
 },[])
 
 async function getAllProduct() {
  let {data} = await axios.get(`${baseUrl}/api/v1/products`)
  setProduct(data.data)
 }

  return (<>

  <Mainslider/>
  <Category/>
  
    <div className='row g-3 mt-5'>
      
     {productlist.map( (product)=>{

     return<div key={product._id} className='col-md-2 product'>
      <Link to={"/ProductDetails/"+product._id}>

     <div className=' border'>
    <img src={product.imageCover} className='w-100' alt="fresh cart" />
    <span className='text-success'>{product.category.name}</span>
    <h2 className='h6 fw-bold'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
    <div className=' d-flex justify-content-between'>
      <p>{product.price}EGP</p>
      <div className=''>
      <i className='fa-solid fa-star text-warning'></i>{product.ratingsAverage}
    </div>
    </div>
  </div>
  </Link>
</div>



})}
</div>
  </>

)
}


