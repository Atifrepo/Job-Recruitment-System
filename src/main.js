import React from 'react'
import{
  BrowserRouter as Router,
  Route,
  Link
  }from 'react-router-dom';
import Home from './home'
import Login from './login'
import SignUp from './signup'
import Student from './pages/Student';
import Company from './pages/Company';
import Admin from './pages/Admin';
const Main = () => (
  <main>
<Router>
    {/* <Route exact path='/' component={Home}/> */}
      <Route exact path='/' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route  path='/student' component={Student} />
      <Route  path='/company' component={Company} />
      <Route path='/Admin' component={Admin} />
      </Router>
  </main>
)
export default Main