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
  setLoading(true);
  setErrmsg("");

  try {
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, objdata);

    if (data.message === 'success') {
      localStorage.setItem("token", data.token);
      saveUserData(data.user);
      navigate('/Home');
    }

  } catch (error) {
    const message = error.response?.data?.message || "Login failed. Please try again.";
    setErrmsg(message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div>
      <h2>Login Now:</h2>
      <form onSubmit={formik.handleSubmit}>


        <div className='my-3'>
        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} type="email" name='email' id='email' className='form-control' />
        <p className='text-danger'>{formik.errors.email}</p>
        </div>

<div className='my-3'>
  <label htmlFor="password">Password:</label>
  <input
    onChange={formik.handleChange}
    type="password"
    name='password'
    id='password'
    className='form-control'
  />
  <p className='text-danger'>{formik.errors.password}</p>

  <div className="text-end mt-1">
    <Link
      to="/ForgetPassword"
      className="text-primary text-decoration-none small"
    >
      Forgot Password?
    </Link>
  </div>
</div>

        <br />


        {loading ?<button  type='text' className='btn btn-success' > <i className='fa-solid fa-spinner fa-spin text-white'></i></button>
        :<button disabled={!formik.isValid} type='submit'  className='btn btn-success' > Login</button>}

        

      </form>
    </div>
  )
}

