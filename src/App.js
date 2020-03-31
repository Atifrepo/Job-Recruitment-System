import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ApplyJob from './ApplyJob';
import Login2 from './login2';
import Header from './header'
import Student from './pages/Student'
import SignUp from "./signup";
import JobSummary from "./pages/JobSummary"
import Market from "./Market";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TaskDetails from "./TaskDetails";
import PostJob from "./PostJob";
import Profile from "./MyProfile"
import PrivateRoute from "./PrivateRoute";

class App extends Component {


    render() {
        return (

            <MuiThemeProvider>
                <div className="App">
                    <Router>
                        <Header/>
                        <div>
                            <Route path='/' component={App}>
                                <Route exact path='/' component={Market}/>
                                <Route path='/login' component={Login2}/>
                                <Route path='/apply' component={ApplyJob}/>
                                <Route path='/student' component={Student}/>
                                <Route path='/SignUp' component={SignUp}/>
                                <Route path='/JobSummary/:id' component={JobSummary}/>
                                <Route path='/market' component={Market}/>
                                <Route path='/jobdetail/:id' component={TaskDetails}/>
                                <PrivateRoute path='/postjob' component={PostJob}/>
                                <Route path="/profile" component={Profile}/>
                            </Route>
                        </div>


                    </Router>
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
