import React, { useContext } from 'react'; 
import { ShopContext } from '../Context/ShopContext'; 
import { useParams } from 'react-router-dom'; 
import { Breadcrum } from '../Components/Breadcrums/Breadcrum'; 
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay'; 
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => { 
    const { all_product } = useContext(ShopContext); 
    const { productId } = useParams(); 
    
    // Convert productId to number for comparison
    const product = all_product.find((e) => e.id === parseInt(productId)); 
    
    // If the product is not found, show a loading message
    if (!product) { 
        return <div>Loading...</div>; 
    } 

    return (
        <div>
            <Breadcrum title={product.name} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
};
