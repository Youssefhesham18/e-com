import React from 'react';
import notFoundImage from '../../assets/404.png';


export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <img 
        src={notFoundImage} 
        alt="Page Not Found" 
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
      <h2>Oops! Page Not Found</h2>
    </div>
  );
}





