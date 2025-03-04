import React, { useContext } from 'react'; 
import './ProductDisplay.css'; 
import star_icon from "../Assets/star_icon.png"; 
import star_dull_icon from "../Assets/star_dull_icon.png"; 
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = ({ product }) => { 
    const {addToCart} = useContext(ShopContext);
    return (
        <>
            {/* Breadcrumb navigation */}
            <div className="breadcrumb">
                <a href="/">Home</a>
                <span className="breadcrumb-separator">/</span>
                <a href="/women">Women</a>
                <span className="breadcrumb-separator">/</span>
                <span>{product.name}</span>
            </div>

            {/* Product display section */}
            <div className="product-display">
                <div className="product-image-thumbnails">
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-image-main">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-details">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-rating">
                        <span className="rating-count">{product.rating} (122)</span>
                        <img src={star_icon} alt="star icon" />
                        <img src={star_icon} alt="star icon" />
                        <img src={star_icon} alt="star icon" />
                        <img src={star_icon} alt="star icon" />
                        <img src={star_dull_icon} alt="star icon" />
                    </div>

                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-right-price-old">${product.old_price}</div>
                        <div className="productdisplay-right-price-new">${product.new_price}</div>
                    </div>
                    <div className="productdisplay-right-description">
                        Gen Z fashion trends are the latest styles and clothing choices favored by today's younger generation, 
                        known as Gen Z. These trends often emphasize individuality, sustainability, and a mix of modern and retro influences.
                        Gen Z values brands that are not only stylish but also socially responsible and inclusive.
                    </div>
                    <div className="productdisplay-right-size">
                        <h1>Select Size</h1>
                    </div>
                    <div className="productdisplay-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                    <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                    <p className="productdisplay-right-category"><span>Category :</span> Women, T-Shirt, Crop Top</p>
                    <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest, Gen Z</p>
                </div>
            </div>
        </>
    );
};
