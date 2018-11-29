import React, { Component } from 'react';
import './LeftPanelAdmin.css';
import *as firebase from 'firebase';
import ViewJobs from './ViewJobs';
import ViewStudents from './ViewStudents'
import ViewAllJobs from './ViewAllJobs'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ViewCompany from './ViewCompany';

class LeftPanelAdmin extends Component {
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
                    <h1>{this.state.user}</h1>
                    <div>
                        <p><Link className="link" to="/Admin/ViewJobs">View Jobs</Link></p>
                        <p><Link className="link" to="/Admin/ViewStudents">View Students</Link></p>
                        <p><Link className="link" to="/Admin/ViewCompany">View Company</Link></p>

                    </div>



                    <Route path="/Admin/ViewJobs" component={ViewAllJobs} />
                    <Route path='/Admin/ViewStudents' component={ViewStudents} />
                    <Route path='/Admin/ViewCompany' component={ViewCompany} />

                </div>
            </Router>
        )
    }


}
export default LeftPanelAdmin;