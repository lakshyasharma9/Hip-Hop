import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data'; // Assuming this is where your product data comes from

// Assuming you have an 'Item' component for rendering each product item
const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className='item'>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className='price'>
        <span className='new-price'>{new_price}</span>
        <span className='old-price'>{old_price}</span> {/* Keep the old price for styling */}
      </p>
    </div>
  );
};

export const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={`$${item.new_price}`} // Ensure prices are shown as currency
              old_price={`$${item.old_price}`}
            />
          );
        })}
      </div>
    </div>
  );
};
