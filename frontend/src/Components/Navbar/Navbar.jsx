import React, { useContext, useRef, useState } from "react"; 
import './Navbar.css';
import logo from '../Assets/LOGO_BIG.png';
import cart_icon from '../Assets/cart_icon.png'; 
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
    const [menu,setMenu] = useState("Shop");
    const {getTotalCartItems}= useContext(ShopContext)
    const menuRef = useRef();
    const dropdown_toggle = (e) =>{
menuRef.current.classList.toggle('nav-menu-visible');
e.target.classList.toggle('');  
    }
    return (
        <div className='navbar'> {/* Corrected className */}
            <div className="nav-logo">
                <img src={logo} alt="Logo" />
                <p>HIP-HOP</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu"> {/* Corrected className */}
                <li onClick={()=>{setMenu("Shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Mens")}}><Link style={{textDecoration:'none'}} to='/Mens'>Men</Link>{menu==="Mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Womens")}}><Link style={{textDecoration:'none'}} to='/Womens'>Women</Link>{menu==="Womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Kids")}}><Link style={{textDecoration:'none'}} to='/Kids'>Kids</Link>{menu==="Kids"?<hr/>:<></>}</li>
            </ul> 
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} >Logout</button>
            :<Link to='/login'><button>Login</button></Link>}
                
                <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
