import React from 'react';
import './DescriptionBox.css';

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>

      {/* This is the description container */}
      <div className="descriptionbox-description">
        {/* Text content */}
        <p>
          An e-commerce website is a virtual store where customers can buy and sell products and services online. 
          It's a digital equivalent of a physical store, with product listings, categories, customer reviews, and a cash register.
          E-commerce websites allow businesses to: process orders, accept payments, manage shipping and logistics, and provide customer service.
          E-commerce websites can sell physical, digital, or downloadable products, as well as services. They typically include features like:
          product catalogs, pricing information, customer reviews, order tracking, customer accounts, and payment processing systems.
        </p>
        <p>
          An e-commerce website displays products and services for sale, and allows consumers to buy them. Some key elements of an e-commerce website include:
          Search bar: Allows users to search for products Header and footer: Provide value to visitors Menu: Guides users to navigate the site Calls-to-action (CTAs): Guide users towards checkout.
        </p>
      </div>
    </div>
  );
}
