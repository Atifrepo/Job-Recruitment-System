import {BrowserRouter as Router, Route} from 'react-router-dom';
import {auth, database, googleAuthProvider} from './firebase';
import React from "react";
import Redirect from "react-router-dom/es/Redirect";

const PrivateRoute = ({ component: Component, ...rest }) => (

        <Route {...rest} render={(props) => (
            auth.currentUser
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default PrivateRoute;