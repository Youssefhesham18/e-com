import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import { CartContext } from '../CartDetails/CartContext';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function ProductDetails() {
  let { id } = useParams();
  let navigate = useNavigate();
  let baseUrl = "https://ecommerce.routemisr.com";
  let [ProductDetail, setProductDetail] = useState();

  let { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    try {
      let { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`);
      setProductDetail(data.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }

  async function addCart(productId) {
    let res = await addToCart(productId);
    if (res?.status === "success") {
      navigate('/CartDetails');
    }
  }

  if (!ProductDetail) return <h3 className='text-center my-5'>Loading Product...</h3>;

  return (
    <div className='row align-items-center'>
      <div className='col-md-4'>
        <OwlCarousel className='owl-theme' loop items={1}>
          {ProductDetail.images.map((el, index) => (
            <div key={index}>
              <img src={el} className='w-100' alt="product" />
            </div>
          ))}
        </OwlCarousel>
      </div>
      <div className='col-md-8'>
        <h2>{ProductDetail.title}</h2>
        <p className='text-muted'>{ProductDetail.description}</p>
        <span className='text-success'>{ProductDetail.category.name}</span>
        <div className='d-flex justify-content-between'>
          <p>{ProductDetail.price} EGP</p>
          <div>
            <i className='fa-solid fa-star text-warning'></i> {ProductDetail.ratingsAverage}
          </div>
        </div>
        <button onClick={() => addCart(ProductDetail._id)} className='btn btn-success w-100'>+ Add to Cart</button>
      </div>
    </div>
  );
}
