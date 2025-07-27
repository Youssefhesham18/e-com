import  axios  from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
    let [loading,setLoading] = useState(false)
    let navigate = useNavigate()
    let baseUrl ="https://ecommerce.routemisr.com";
  
    let validationSchema = Yup.object({
      email: Yup.string().email("Enter Valid email").required(),
      newPassword: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{3,16}$/,"Password Must be Start with uppercase letter"),
  
    })
  
   let formik = useFormik({
    initialValues:{
      email: "",
      newPassword: "",
  
    },
  
  
    onSubmit:(data)=>{
      ResetPasswordApi(data)
    console.log(data);
  
    },
  
    validationSchema,
   })

  async function ResetPasswordApi(value) {
    setLoading(true)
   
    let {data}  = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,value)
    console.log(data);
    if (data.token) {
        navigate("/Login")
    }
    
   }
  return (
    <form onSubmit={formik.handleSubmit}>


    <div className='my-3'>
    <label htmlFor="email">email:</label>
    <input onChange={formik.handleChange} type="email" name='email' id='email' className='form-control' />
    <p className='text-danger'>{formik.errors.email}</p>
    </div>

    <div className='my-3'>
    <label htmlFor="newPassword">newPassword:</label>
    <input onChange={formik.handleChange} type="password" name='newPassword' id='newPassword' className='form-control' />
    <p className='text-danger'>{formik.errors.newPassword}</p>
    </div>

{loading ?  <button  type='text' className='btn btn-success' > <i className='fa-solid fa-spinner fa-spin text-white'></i></button> : <button className='btn btn-success mt-2' >Updata Password</button>}
   
    </form>
  )
}
