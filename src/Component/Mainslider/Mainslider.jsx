import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import s1 from '../../assets/images/s1.jpeg'
import s2 from '../../assets/images/s2.jpeg'
import s3 from '../../assets/images/s3.jpeg'

export default function Mainslider() {
  return (
    <div className='row g-0'>

      <div className='col-md-9'>




      <OwlCarousel className='owl-theme' autoplay={true} autoplayTimeout={2000} items={1} loop> 
      <img src={s1} className='w-100' height={400}  alt="freshcart"/>
      <img src={s2} className='w-100' height={400} alt="freshcart" />
      <img src={s3} className='w-100' height={400} alt="freshcart" />
    </OwlCarousel>

      </div>
      <div className='col-md-3'>
      <img src={s2} className='w-100' height={200} alt="freshcart" />
      <img src={s3} className='w-100' height={200} alt="freshcart" />

      </div>
    </div>
  )
}
