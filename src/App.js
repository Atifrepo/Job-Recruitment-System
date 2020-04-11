import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ApplyJob from './ApplyJob';
import Login2 from './login2';
import Header from './header'
import Student from './pages/Student'
import SignUp from "./signup";
import JobSummaryApply from "./pages/JobSummaryApply"
import Market from "./Market";
import {BrowserRouter, Route} from 'react-router-dom';
import TaskDetails from "./TaskDetails";
import PostJob from "./PostJob";
import Profile from "./MyProfile"
import {Container} from "reactstrap";
import PrivateRoute from "./PrivateRoute";
import JobSummaryPost from "./pages/JobSummaryPost";
import {auth} from "./firebase";
import Redirect from "react-router-dom/es/Redirect";
import withAuthentication from "./withAuthentication";

const App = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <Container>
                <Header/>
                <div>
                    <Route exact path='/' component={Market}/>
                    <Route exact path='/login' component={Login2}/>
                    <Route exact path='/apply/:id' component={ApplyJob}/>
                    <Route exact path='/student' component={Student}/>
                    <Route exact path='/SignUp' component={SignUp}/>
                    <Route exact path='/JobSummary/apply/:id/:pid' component={JobSummaryApply}/>
                    <Route exact path='/JobSummary/post/:id' component={JobSummaryPost}/>
                    <Route exact path='/market' component={Market}/>
                    <Route exact path='/jobdetail/:id' component={TaskDetails}/>
                    <Route exact path='/postjob' component={PostJob}/>
                    <Route exact path="/profile" component={Profile}/>

                </div>

            </Container>
        </BrowserRouter>
    </MuiThemeProvider>
)

export default withAuthentication(App);
