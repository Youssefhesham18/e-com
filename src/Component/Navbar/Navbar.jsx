import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/freshcart-logo.svg';
import { CartContext } from '../CartDetails/CartContext.js';

export default function Navbar({ userData, logOut }) {
  let { cartData, getAllCartData } = useContext(CartContext);

  useEffect(() => {
    getAllCartData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="w-100" alt="freshcart" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link custom-hover" to="Home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Categories" className="nav-link custom-hover">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link custom-hover" to="Products">Products</NavLink>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData ? (
              <>
                <li className="nav-item py-2">
                  <i className="fa-brands fa-facebook mx-2 social-icon"></i>
                  <i className="fa-brands fa-twitter mx-2 social-icon"></i>
                  <i className="fa-brands fa-spotify mx-2 social-icon"></i>
                  <i className="fa-brands fa-youtube mx-2 social-icon"></i>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link custom-hover" to="Profile">Profile</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link custom-hover" to="CartDetails">
                    <span className="position-relative">
                      <i className="fa-solid fa-shopping-cart"></i>
                      {cartData?.numOfCartItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                          {cartData.numOfCartItems}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <span
                    className="nav-link custom-hover"
                    style={{ cursor: 'pointer' }}
                    onClick={logOut}
                  >
                    LogOut
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link custom-hover" to="Login">Login</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className="nav-link custom-hover" to="/Register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
