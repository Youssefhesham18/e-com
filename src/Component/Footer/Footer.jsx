import React from 'react';
import img1 from '../../assets/amazon-pay.png';
import img2 from '../../assets/American-Express-Color.png';
import img3 from '../../assets/mastercard.webp';
import img4 from '../../assets/paypal.png';
import img5 from '../../assets/get-apple-store.png';
import img6 from '../../assets/get-google-play.png';

export default function Footer() {
  return (
    <footer className="bg-light py-5 mt-5 w-100">
      <div className="container-fluid px-5">
        <h3 className="mb-2 fw-semibold">Get The FreshCart App</h3>
        <p className="text-muted mb-4">We will send you a link, open it on your phone to download the app</p>

        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <input
              type="email"
              className="form-control"
              placeholder="name@mail.com"
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-dark w-100">Share App Link</button>
          </div>
        </div>

        <hr />

        <div className="row mt-4 align-items-center">
          <div className="col-lg-6 d-flex flex-wrap align-items-center gap-3 mb-3 mb-lg-0">
            <h5 className="mb-0 me-3">Payment Partners</h5>
            <img src={img1} alt="Amazon Pay" height={35} />
            <img src={img2} alt="American Express" height={35} />
            <img src={img3} alt="Mastercard" height={35} />
            <img src={img4} alt="PayPal" height={35} />
          </div>

          <div className="col-lg-6 d-flex flex-wrap align-items-center gap-3 justify-content-lg-end">
            <h5 className="mb-0 me-3">Get Deliveries with FreshCart</h5>
            <img src={img5} alt="App Store" height={35} />
            <img src={img6} alt="Google Play" height={35} />
          </div>
        </div>
      </div>
    </footer>
  );
}
