import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartid } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const baseUrl = "https://ecommerce.routemisr.com";

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (vals) => {
      // Default submit does online checkout
      onlineOrder(cartid, vals);

    }
  });

  // ✅ Online Payment Function
async function onlineOrder(cartid, vals) {
  try {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=https://e-com-iota-henna.vercel.app`,
      { shippingAddress: vals },
      { headers: { token: localStorage.getItem("token") } }
    );

    if (data.status === "success") {
      window.location.href = data.session.url;
    }
  } catch (error) {
    console.error("Payment error:", error);
  }
}


  async function createCashOrder(cartId, shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        {
          headers: {
            token
          }
        }
      );

      if (data.status === "success") {
        console.log("Cash order created successfully");
        navigate("/allorders");
      }
    } catch (error) {
      console.error("Cash order error:", error.response?.data || error.message);
    }
  }

  function handleCashOrder() {
    const shippingAddress = formik.values;
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        createCashOrder(cartid, shippingAddress);
      } else {
        alert("Please fill all required fields");
      }
    });
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

        <div className='text-center mt-3 d-flex justify-content-center gap-3'>
          <button type='submit' className='btn btn-success px-4'>
            <i className="fa-solid fa-credit-card me-1"></i> Online Payment
          </button>

          <button type='button' className='btn btn-primary px-4' onClick={handleCashOrder}>
            <i className="fa-solid fa-truck me-1"></i> Cash on Delivery
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
