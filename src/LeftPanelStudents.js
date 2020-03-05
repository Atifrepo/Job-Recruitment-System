import React, { Component } from 'react';
import * as firebase from 'firebase';
import StudentDetails from './StudentDetails';
import ViewCompany from './ViewCompany'
import ViewJobs from './ViewJobs';
import './LeftPanelStudents.css';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import JobList from "./Components/JobList";
import JobListApply from "./Components/JobListApply";
import Divider from "@material-ui/core/Divider";
import Logout from "./logout";
class LeftPanelStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'guanzhou'
        }
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(() => {
    //
    //         var userId = firebase.auth().currentUser.uid;
    //         const rootRef = firebase.database().ref();
    //         const speedRef = rootRef.child('USER/' + userId);
    //         speedRef.on('value', snap => {
    //             var userName = snap.val().fname;
    //             console.log(userName);
    //             this.setState({ user: userName })
    //         });
    //     })
    // }

    // StudentDetailss() {
    //     this.props.push('/StudentDetails');
    // }

    // ViewCompany() {
    //     this.props.push('/ViewCompany');
    // }

    // ViewJobs() {
    //     this.props.push('/ViewJobs');
    // }

    render() {
        return (
            <div>
                <div >

                     {this.state.user?
                         <div>
                             <div style={{backgroundColor:'#152938', height: 50}}>
                                 <h2 style={{ color: '#FFFFFF' }}>{this.state.user}</h2>
                             </div>
                             <div style={{margin:'auto', height:'auto', overflow:'auto',backgroundColor:'#1f3b51'}}>
                                 <h3 style={{ color: '#FFFFFF' }}>My Post</h3>
                                 <Divider/>
                                 <JobList/>
                         </div>
                             <div style={{margin:'auto', height:'auto', overflow:'auto',backgroundColor:'#4b6273'}}>
                                 <h3 style={{ color: '#FFFFFF' }}>My Application</h3>
                                 <Divider/>
                                 <JobListApply/>
                             </div>

                         </div>


                    :
                         //if not log in, redirect to login page.
                         <Redirect to="/"/>
                     }

                   

                </div>
                <Logout {...this.props}/>
            </div>
        )
    }
}
export default LeftPanelStudents;