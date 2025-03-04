import React from 'react'
import './Offer.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offer = () => {
  return (
    <div className='offer'>
        <div className="offer-left">
<h1>Exclusive</h1>
<h1>Offers for you</h1>
<p>ONLY ON BEST SELLER PRODUCTS</p>
<button>Check Now</button>
        </div>
<div className="offer-right">
    <img src={exclusive_image} alt=""/>
</div>
    </div>
  )
}
