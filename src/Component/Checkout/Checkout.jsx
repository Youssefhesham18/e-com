import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';

function Checkout() {
  let { cartid } = useParams();
  let baseUrl = "https://route-ecommerce.onrender.com";

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (vals) => {
      checkout(vals, cartid);
    }
  });

async function checkout(vals, cartid) {
  try {
    let token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log("Cart ID:", cartid);
    console.log("Form values:", vals);
let { data } = await axios.post(
  `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartid}?url=https://e-com-iota-henna.vercel.app`,
  { shippingAddress: vals },
  { headers: { token: localStorage.getItem("token") } }
);


    console.log("Checkout response:", data);

    if (data.status === "success") {
      window.open(data.session.url);
    }
  } catch (error) {
    console.error("Checkout error:", error.response?.data || error.message);
  }
}


  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Checkout</h3>
      <form onSubmit={formik.handleSubmit} className='w-50 mx-auto'>
        <div className='my-2'>
          <label htmlFor="details">Address Details</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name='details'
            id='details'
            className='form-control'
          />
        </div>
        <div className='my-2'>
          <label htmlFor="phone">Phone</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name='phone'
            id='phone'
            className='form-control'
          />
        </div>
        <div className='my-2'>
          <label htmlFor="city">City</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name='city'
            id='city'
            className='form-control'
          />
        </div>

        <div className='text-center mt-3'>
          <button type='submit' className='btn btn-success px-4'>
            <i className="fa-solid fa-credit-card me-1"></i> Online Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
