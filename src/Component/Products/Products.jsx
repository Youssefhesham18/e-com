import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../CartDetails/CartContext";
import "./Products.css"; // هنضيف ملف CSS خارجي

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  async function getProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(data.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold text-center">🛍️ All Products</h3>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
            <div className="card product-card h-100 shadow-sm border-0 rounded-3">
              <Link to={`/ProductDetails/${product._id}`} className="text-decoration-none text-dark">
<img
  src={product.imageCover}
  className="card-img-top p-2"
  alt={product.title}
  style={{ height: "230px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
/>

                <div className="card-body">
                  <h6 className="fw-bold">{product.title.split(" ").slice(0, 4).join(" ")}...</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fw-semibold">EGP {product.price}</span>
                    <span className="text-warning small">⭐ {product.ratingsAverage || 0}</span>
                  </div>
                </div>
              </Link>
              <div className="card-footer bg-white border-0 px-3 pb-3">
                <button
                  onClick={() => addToCart(product._id)}
                  className="btn btn-outline-success w-100 add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
