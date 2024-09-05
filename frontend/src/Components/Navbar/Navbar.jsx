import React, { useState } from "react"; 
import './Navbar.css';
import logo from '../Assets/LOGO_BIG.png';
import cart_icon from '../Assets/cart_icon.png'; 
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menu,setMenu] = useState("Shop");
    return (
        <div className='navbar'> {/* Corrected className */}
            <div className="nav-logo">
                <img src={logo} alt="Logo" />
                <p>HIPHOP</p>
            </div>
            <ul className="nav-menu"> {/* Corrected className */}
                <li onClick={()=>{setMenu("Shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Mens")}}><Link style={{textDecoration:'none'}} to='/Mens'>Men</Link>{menu==="Mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Womens")}}><Link style={{textDecoration:'none'}} to='/Womens'>Women</Link>{menu==="Womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Kids")}}><Link style={{textDecoration:'none'}} to='/Kids'>Kids</Link>{menu==="Kids"?<hr/>:<></>}</li>
            </ul> 
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    );
}

export default Navbar;
