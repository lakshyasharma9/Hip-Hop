import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetail] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetail({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        try {
            // Validate required fields
            if (!image || !productDetails.name || !productDetails.category || !productDetails.new_price || !productDetails.old_price) {
                alert('Please fill all fields and select an image');
                return;
            }

            let formData = new FormData();
            formData.append('product', image);

            // Upload image first
            const uploadResponse = await fetch('http://localhost:4001/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                throw new Error('Image upload failed');
            }

            const responseData = await uploadResponse.json();

            if (responseData.success) {
                const product = {
                    ...productDetails,
                    image: responseData.image_url,
                    new_price: Number(productDetails.new_price),
                    old_price: Number(productDetails.old_price)
                };

                // Add product
                const productResponse = await fetch('http://localhost:4001/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                if (!productResponse.ok) {
                    throw new Error('Failed to add product');
                }

                const data = await productResponse.json();
                if (data.success) {
                    alert("Product Added Successfully");
                    // Clear form
                    setProductDetail({
                        name: "",
                        image: "",
                        category: "",
                        new_price: "",
                        old_price: ""
                    });
                    setImage(false);
                } else {
                    alert("Failed to add product");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}. Please check if server is running on port 4001`);
        }
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input 
                    value={productDetails.name} 
                    onChange={changeHandler} 
                    type="text" 
                    name='name' 
                    placeholder='Type here' 
                />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input 
                        value={productDetails.old_price} 
                        onChange={changeHandler} 
                        type="number" 
                        name='old_price' 
                        placeholder='Type here' 
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input 
                        value={productDetails.new_price} 
                        onChange={changeHandler} 
                        type="number" 
                        name='new_price' 
                        placeholder='Type here' 
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Category</p>
                    <select 
                        value={productDetails.category} 
                        onChange={changeHandler} 
                        name="category" 
                        className='add-product-selector'
                    >
                        <option value="">Select Category</option>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kid</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img 
                            src={image ? URL.createObjectURL(image) : upload_area} 
                            className='addproduct-thumnail-img' 
                            alt="" 
                        />
                    </label>
                    <input 
                        onChange={imageHandler} 
                        type="file" 
                        name='image' 
                        id='file-input' 
                        accept="image/*" 
                        hidden
                    />
                </div>
                <button 
                    onClick={Add_Product} 
                    className='addproduct-btn'
                >
                    ADD
                </button>
            </div>
        </div>
    )
}

export default AddProduct