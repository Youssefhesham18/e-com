import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Category() {
  const baseUrl = "https://ecommerce.routemisr.com";
  const [categorieslist, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
      console.log("Categories:", data);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const options = {
    items: 4,
    margin: 15,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 4 }
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-3">Categories</h3>
     <div>
<OwlCarousel className='owl-theme' autoplay autoplayTimeout={2000} loop items={5} margin={10}>
  {categorieslist.map((el) => (
    <div key={el._id} className="item text-center">
      <img src={el.image} alt={el.name} className="w-100 rounded-3" style={{ height: "200px", objectFit: "cover" }} />
      <h6 className='fw-bold mt-2'>{el.name}</h6>
    </div>
  ))}
</OwlCarousel>

</div>

    </div>
  );
}
