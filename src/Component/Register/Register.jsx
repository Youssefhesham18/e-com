import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  const [errmsg, setErrmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "min char 2").max(15, "max char 15"),
    email: Yup.string().email("Enter valid email").required("Email is required"),
    phone: Yup.string().required("Phone is required").matches(/^(010|011|012|015)[0-9]{8}$/, "Enter valid phone"),
    password: Yup.string().required("Password is required").matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{3,16}$/, "Password must start with uppercase letter"),
    rePassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (data) => {
      sendDataRegister(data);
    }
  });

  async function sendDataRegister(objdata) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, objdata);
      if (data.message === 'success') {
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.data?.errors?.msg) {
        setErrmsg(error.response.data.errors.msg);
      } else if (error.response?.data?.message) {
        setErrmsg(error.response.data.message);
      } else {
        setErrmsg("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-4">
      <h2>Register Now:</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className='my-3'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name='name'
            id='name'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <p className='text-danger'>{formik.errors.name}</p>}
        </div>

        {/* Email */}
        <div className='my-3'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name='email'
            id='email'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <p className='text-danger'>{formik.errors.email}</p>}
        </div>

        {/* Password */}
        <div className='my-3'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name='password'
            id='password'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <p className='text-danger'>{formik.errors.password}</p>}
        </div>

        {/* RePassword */}
        <div className='my-3'>
          <label htmlFor="rePassword">RePassword:</label>
          <input
            type="password"
            name='rePassword'
            id='rePassword'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.touched.rePassword && formik.errors.rePassword && <p className='text-danger'>{formik.errors.rePassword}</p>}
        </div>

        {/* Phone */}
        <div className='my-3'>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name='phone'
            id='phone'
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && <p className='text-danger'>{formik.errors.phone}</p>}
        </div>

        {/* Error Message */}
        {errmsg && <div className='alert alert-danger'>{errmsg}</div>}

        {/* Submit Button */}
        {loading ? (
          <button type='button' className='btn btn-success'>
            <i className='fa-solid fa-spinner fa-spin text-white'></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type='submit'
            className='btn btn-success'
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
