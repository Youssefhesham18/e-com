import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgetPassword() {
    let baseUrl ="https://ecommerce.routemisr.com";

    let [loading,setLoading] = useState(false)
    let [loading2,setLoading2] = useState(false)
   let navg = useNavigate()
    let [CodeFlag,setCode]= useState(true)

    let [errormsg,seterrormsg]= useState("")

    let validationSchema = Yup.object({
        email: Yup.string().email("Ente Valid Email").required()
    })

  
    let From1 =useFormik({
        initialValues: {
            email: ""
        },
        onSubmit:(value)=>{
            console.log(value);
            ForgetPasswordapi(value)

        },
        validationSchema
        
    })
    let From2 =useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit:(value)=>{
            console.log(value);
            resetcodeapi(value)

        }
        
    })

   async function ForgetPasswordapi(valu) {
    setLoading(true)
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,valu)
        if(data.statusMsg == "success")(
            setCode(false)

        )
   
    }

   async function resetcodeapi(valu2) {
    setLoading2(true)
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,valu2).catch((error)=>{
        seterrormsg(error.response.data.message)
        setLoading2(false)
        })

        setLoading2(false)
        if (data.status == "Success") {
            navg('/ResetPassword')
  
        }


    }
    return (
    <div>



        {CodeFlag ?<form onSubmit={From1.handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input onChange={From1.handleChange} type="email" name='email' id='email' className='form-control'  />
                <p className='text-danger'>{From1.errors.email}</p>
            </div>

            {loading ?<button  type='text' className='btn btn-success mt-2' > <i className='fa-solid fa-spinner fa-spin text-white'></i></button> 
            :<button className='btn btn-success mt-2' > Send Message</button>}

        </form>
 :  
 <form onSubmit={From2.handleSubmit}>
            <div>
                <label htmlFor="resetCode">Reset Code:</label>
                <input onChange={From2.handleChange} type="text" name='resetCode' id='resetCode' className='form-control'  />
            </div>

         {errormsg !=""? <div className='alert alert-danger'>{errormsg}</div>:""}  
         {loading2 ?<button  type='text' className='btn btn-success mt-2' > <i className='fa-solid fa-spinner fa-spin text-white'></i></button> 
            :<button className='btn btn-success mt-2' > Confirm Code</button>}
        </form>}




    </div>
  )
}
