import React from 'react'
import {Link} from 'react-router-dom'

const navStyle = {
    color: 'white'
};

const Header = () => (

    <nav>
        <Link style={navStyle} to="/"><h3>JobHunter</h3></Link>
        <ul className="nav-links">
            <button style={{'background-color': '#fb601d'}}><NavLink href={'/postjob'}>Post Job</NavLink></button>
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
