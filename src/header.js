import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav';
import Login from './login';
import SideBar from './layout/sidebar';
import NavLink from "react-bootstrap/NavLink";
// The Header creates links that can be used to navigate
// between routes.

const navStyle = {
    color:'white'
};

const Header = () => (

    <nav>
        <Link style = {navStyle} to="/"><h3>JobHunter</h3></Link>
        <ul className="nav-links">
            <Link style = {navStyle} to="/market">
                <li>Market</li>
            </Link>
            <Link style = {navStyle}  to="/student">
                <li>My Task</li>
            </Link>

            <Link to='/postjob'>Post Job</Link>
            <Link  to='/profile'>My Profile</Link>


        </ul>
    </nav>
)

export default Header
