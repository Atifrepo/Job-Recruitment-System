import {Route} from 'react-router-dom';
import {auth} from './firebase';
import React from "react";
import Redirect from "react-router-dom/es/Redirect";

console.log(auth.currentUser)

const PrivateRoute = ({ component: Component,user:User, ...rest }) => (

        <Route  {...rest} render={(props) => (
            auth.currentUser
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


export default PrivateRoute;