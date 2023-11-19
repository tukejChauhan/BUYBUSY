import './style.css';
import {Link, Outlet} from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";

import { productsSelector } from '../../redux/reducers/productsReducer';


export default function Navbar(){

    var {user} = useSelector(productsSelector);

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link className='navbar-logo active' to='/'>Busy Buy</Link>
                <ul className='nav-menu'>
                    <li className='nav-item active'>
                        <Link className='nav-links active' to='/'>
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/609/609803.png" alt="home"></img></span>
                            Home
                        </Link>
                    </li>   
                    {user? <>
                        <li className='nav-item active'>
                        <Link className='nav-links active' to="/Cart">
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/2838/2838838.png" alt="sign-in"></img></span>
                            Cart
                        </Link>
                    </li>
                    <li className='nav-item active'>
                        <Link className='nav-links active' to="/Orders">
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/6021/6021475.png" alt="sign-in"></img></span>
                            My Orders
                        </Link>
                    </li>
                    </>:""}
                    <li className='nav-item active'>
                        <Link className='nav-links active' to={user? "/Logout":"/SignIn" }>
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/3596/3596092.png  " alt="sign-in"></img></span>
                            {user? "Logout":"SignIn"}
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
            <Outlet />
        </>
    )
}