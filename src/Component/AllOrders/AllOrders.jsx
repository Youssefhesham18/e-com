import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";


export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

async function getUserOrders() {
  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: {
          token
        }
      }
    );

    console.log("Orders:", data);
    setOrders(data);
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
  }
}


  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Your Orders</h3>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded p-3 mb-3 shadow-sm">
            <h5>Order #{order.id}</h5>
            <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
            <p><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>
            <p><strong>Status:</strong> {order.status}</p>
            <hr />
            <h6>Items:</h6>
{order.cartItems.map(item => (
  <div key={item._id} className="d-flex align-items-center justify-content-between border p-2 rounded my-2">
    <div className="d-flex align-items-center gap-3">
      <img 
        src={item.product.imageCover} 
        alt={item.product.title} 
        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
      />
      <div>
        <strong>{item.product.title}</strong>
        <p className="mb-0 text-muted">Price: {item.price} EGP</p>
        <p className="mb-0 text-muted">Quantity: {item.count}</p>
      </div>
    </div>
  </div>
))}

          </div>
        ))
      )}
    </div>
  );
}
