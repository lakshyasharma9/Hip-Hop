
import React, { useContext } from 'react';
import './ShopCategory.css';  // Updated to match your file name exactly
import { ShopContext } from '../Context/ShopContext';
import { Item } from '../Components/Item/Item';

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-insertSort">
        <p>
          Showing 1-12 out of <span>36</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by <span>⌄</span>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product
          .filter((item) => props.category === item.category.toLowerCase())
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              category={item.category}
            />
          ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};