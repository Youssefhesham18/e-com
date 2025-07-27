import  axios  from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Login({saveUserData}) {
  let [errmsg,setErrmsg] = useState("")
  let [loading,setLoading] = useState(false)
  let navigate =useNavigate()
  let baseUrl ="https://ecommerce.routemisr.com";

  let validationSchema = Yup.object({
    email: Yup.string().email("Enter Valid email").required(),
    password: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{3,16}$/,"Password Must be Start with uppercase letter"),

  })

 let formik = useFormik({
  initialValues:{
    email: "",
    password: "",

  },


  onSubmit:(data)=>{
    sendDataLogin(data)
  console.log(data);

  },

  validationSchema,
 })

 async function sendDataLogin(objdata) {
  setLoading(true)
  
  let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,objdata).catch((error)=>{
    setErrmsg(error.response.data.message)
    setLoading(false)

  })
  setLoading(false)
  
  if(data.message == 'success'){
    //login
    //data.user
    localStorage.setItem("token",data.token)

    saveUserData(data.user)
    navigate('/Home')
  }
 
 }

  return (
    <div>
      <h2>Login Now:</h2>
      <form onSubmit={formik.handleSubmit}>


        <div className='my-3'>
        <label htmlFor="email">email:</label>
        <input onChange={formik.handleChange} type="email" name='email' id='email' className='form-control' />
        <p className='text-danger'>{formik.errors.email}</p>
        </div>

        <div className='my-3'>
        <label htmlFor="password">password:</label>
        <input onChange={formik.handleChange} type="password" name='password' id='password' className='form-control' />
        <p className='text-danger'>{formik.errors.password}</p>
        </div>



        {errmsg !=""? <div className='alert alert-danger'>
          {errmsg}
        </div> : ""}


  
        <Link to="/ForgetPassword">ForgetPassword ?</Link>
        <br />


        {loading ?<button  type='text' className='btn btn-success' > <i className='fa-solid fa-spinner fa-spin text-white'></i></button>
        :<button disabled={!formik.isValid} type='submit'  className='btn btn-success' > Login</button>}

        

      </form>
    </div>
  )
}

