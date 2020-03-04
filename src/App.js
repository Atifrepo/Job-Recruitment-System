import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Company from './pages/Company'
import Admin from './pages/Admin'
import logo from './logo.svg';
import './App.css';
import ApplyJob from './ApplyJob';
import Login from './login';
import Header from './header'
import Main from './main'
import Student from './pages/Student'
import SignUp from "./signup";
import JobSummary from "./pages/JobSummary"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class App extends Component {


    render() {
        return (


            <MuiThemeProvider>
                <div className="App">
                    <div className="App-header">
                        <h2 id="titlename">Job Portal</h2>
                        {/* <img id="HeaderImage" src="home/atif/hello-world/src//title.jpg" alt="logo"/>  */}
                        {/* <img src="title.jpg" alt="logo" height="250" width="250" /> */}
                    </div>

                    <Router>
                        <div>
                            {/* <Route path='/loginnn' Component={Main} />  */}
                            <Route exact path='/' component={Login}/>
                            <Route path='/apply' component={ApplyJob}/>
                            <Route path='/student' component={Student}/>
                            <Route path='/SignUp' component={SignUp}/>
                            <Route path='/company' component={Company}/>
                            <Route path='/Admin' component={Admin}/>
                            <Route path='/JobSummary/:id' component={JobSummary}/>
                        </div>


                    </Router>
                </div>
            </MuiThemeProvider>


        );
    }

}

export default App;
