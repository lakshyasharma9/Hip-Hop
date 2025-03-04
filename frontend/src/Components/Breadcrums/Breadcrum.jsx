import React from 'react';
import './Breadcrum.css';
import Arrow_icon from '../Assets/breadcrum_arrow.png';

export const Breadcrum = (props) => {
  const { product } = props;
  
  if (!product) return null;

  return (
    <div className='breadcrum'>
      HOME <img src={Arrow_icon} alt="arrow" /> 
      SHOP <img src={Arrow_icon} alt="arrow" /> 
      {product.category} <img src={Arrow_icon} alt="arrow" /> 
      {product.name}
    </div>
  );
};