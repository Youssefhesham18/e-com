import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext.js';
import { Link } from 'react-router-dom';

export default function CartDetails() {

  let { getAllCartData, cartData, removeItem, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    getAllCartData();
  }, []);

  if (!cartData) return <h3 className='text-center my-5'>Loading Cart...</h3>;
  if (cartData?.numOfCartItems === 0) return <h3 className='text-center my-5'>Cart is Empty</h3>;

  return (
    <div className="container">
      <table className='table table-striped table-bordered my-3 text-center' style={{ verticalAlign: 'middle' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartData.data.products.map((el) => (
            <tr key={el.product._id}>
              <td>
                <img src={el.product.imageCover} className='w-75' height={100} alt="" />
              </td>
              <td>{el.product.title}</td>
              <td>
                <button className='btn btn-danger' onClick={() => {
                  if (el.count > 1) updateQuantity(el.product._id, el.count - 1)
                }}>-</button>
                <span className='mx-3'>{el.count}</span>
                <button className='btn btn-success' onClick={() => updateQuantity(el.product._id, el.count + 1)}>+</button>
              </td>
              <td>{el.price} EGP</td>
              <td>
                <i onClick={() => removeItem(el.product._id)} className='fa-solid fa-trash text-danger cursor'></i>
              </td>
            </tr>
          ))}
          <tr className='table-danger'>
            <td colSpan={4}>Total</td>
            <td>{cartData.data.totalCartPrice} EGP</td>
          </tr>
        </tbody>
      </table>

{cartData?.data?._id && (
  <div className="text-center mt-4"> 
    <Link
      to={`/Checkout/${cartData.data._id}`}
      className="btn btn-success checkout-btn"
    >
      <i className="fas fa-credit-card me-1"></i>
      CheckOut Payment
    </Link>
  </div>
)}


    </div>
  );
}
