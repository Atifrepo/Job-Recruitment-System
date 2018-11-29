import React, { Component } from 'react';
import * as firebase from 'firebase';
import StudentDetails from './StudentDetails';
import ViewCompany from './ViewCompany'
import ViewJobs from './ViewJobs';
import './LeftPanelStudents.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class LeftPanelStudents extends Component {

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
            <Router>
                <div style={{backgroundColor:'#BDBDBD'}}>
                     {this.state.user?
                    <div>
                        <h1> Student </h1>
                        <h2 style={{ color: '#212121' }}>{this.state.user}</h2>
                        <p><Link className='link' to='/student/StudentDetails' > Student Details </Link></p>
                       
                        <p><Link className='link' to='/student/ViewJobs'>ViewJobs</Link> </p>
                        <p><Link className='link' to='/student/ViewCompany'>ViewCompany</Link> </p>                        

                    </div> 
                    :
                    <h4>Login first!!!</h4>
                     }
                    <Route path='/student/StudentDetails' component={StudentDetails} />
                    <Route path='/student/ViewJobs' component={ViewJobs} />
                    <Route path='/student/ViewCompany' component={ViewCompany} />

                   

                </div>

            </Router>
        )
    }
}
export default LeftPanelStudents;