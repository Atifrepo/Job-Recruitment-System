import React from 'react'
import {Link} from 'react-router-dom'
import NavLink from "react-bootstrap/NavLink";

const navStyle = {
    color: 'white'
};

const Header = () => (

    <nav>
        <Link style={navStyle} to="/"><h3>JobHunter</h3></Link>
        <ul className="nav-links">

            <Link style={navStyle} style={{'color': '#fb601d'}} to="/postjob">
                <li>Post Job</li>
            </Link>
            <Link style={navStyle} to="/market">
                <li>Market</li>
            </Link>
            <Link style={navStyle} to="/student">
                <li>My Task</li>
            </Link>
            <Link to='/profile'>My Profile</Link>
        </ul>
    </nav>
);

export default Header
