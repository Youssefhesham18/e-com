// src/Component/Category/AllCategories.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data.data);
  }

  return (
    <div className="row g-4 mt-4">
      {categories.map((cat) => (
        <div className="col-md-3" key={cat._id}>
          <div className="border p-2 text-center rounded-3 shadow-sm">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-100 rounded-3"
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <h5 className="mt-2">{cat.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
