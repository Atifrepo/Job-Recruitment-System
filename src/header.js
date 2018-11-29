import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav';
import Login from './login';
import SideBar from './layout/sidebar';
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        {/* <li ><Link to='/'>Home</Link></li> */}
         {/* <li><Link to='/login'>login</Link></li> 
         <li><Link to='/signup'>signup</Link></li>*/}
         {/* <li><Link to='/Student'>student</Link></li>  */}
          <Login />  
        <Nav />
        <SideBar />

      </ul>
    </nav>
  </header>
)

export default Header
