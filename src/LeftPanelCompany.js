import React, { Component } from 'react';
import * as firebase from 'firebase';
import './LeftPanelCompany.css';
import JobPost from './JobPost';
import MyPostJobs from './MyPostJobs';
import ViewStudents from './ViewStudents';
import ViewApplicants from './ViewApplicants'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class LeftPanelCompany extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('USER/' + userId);
            speedRef.on('value', snap => {
                var userName = snap.val().fname
                console.log(userName);
                this.setState({ user: userName })
            });
        })
    }

    render() {
        return (
            <Router>
                <div>

                    <div>
                        <h1>Company</h1>
                        <h2>{this.state.user}</h2>
                        {/* <img src="title.jpg" alt="logo" height="250" width="250" /> */}
                        <p><Link style={{ backgroundColor: '#BDBDBD' }} className="link" to='/company/JobPost'>Post Job</Link></p>
                        <p><Link style={{ backgroundColor: '#BDBDBD' }} className="link" to='/company/MyPostJobs'>My Post Job</Link></p>
                        <p><Link style={{ backgroundColor: '#BDBDBD' }} className="link" to='/company/ViewStudents'> View Students</Link></p>
                        <p><Link style={{ backgroundColor: '#BDBDBD' }} className="link" to='/company/ViewApplicants'> View Applicants</Link></p>
                   
                    </div>
                    {/* // :
            //    <h4>please wait. . </h4>
            } */}
                    <Route path='/company/JobPost' component={JobPost} />
                    <Route path='/company/MyPostJobs' component={MyPostJobs} />
                   <Route path='/company/ViewApplicants' component={ViewApplicants} />
                    <Route path='/company/ViewStudents' component={ViewStudents} />
                </div>
            </Router>

        );
    }
}
export default LeftPanelCompany;