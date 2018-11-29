import React from 'react';
import { render } from 'react-dom'
//import injectTapEventPlugin from 'react-tap-event-plugin'; 
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBhbe3f5GyUR61btnW3w1iscMQwnwLusio",
    authDomain: "login-signup-2e4d2.firebaseapp.com",
    databaseURL: "https://login-signup-2e4d2.firebaseio.com",
    projectId: "login-signup-2e4d2",
    storageBucket: "login-signup-2e4d2.appspot.com",
    messagingSenderId: "371983608218"
  };
 var index= firebase.initializeApp(config);

render (<App/>, document.getElementById('root') );
