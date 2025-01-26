import React from 'react';
import './CardSimmerEffect.css'; // Import CSS file for styling

const CardSimmerEffect = () => {
  return (
    <div className='container flex gap-4 justify-content-center px-16 align-items-center'>
        {[...Array(4)].map((_, index) => (
          <div key={index} className='card simmer-card'>
            <div className='simmer-effect'></div>
          </div>
        ))}
    </div>
  );
}

export default CardSimmerEffect;