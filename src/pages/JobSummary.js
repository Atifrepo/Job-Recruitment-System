import React, { Component } from 'react';
import LeftPanelStudents from '../LeftPanelStudents';
import * as firebase from 'firebase';
import Logout from '../logout';
import ContactList from "../Components/ContactList";
class JobSummary extends Component {
    constructor() {
        super();
        this.state = {
            firebase: ''
        }
    }
    getData() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('USER').once('value').then(function (snapshot) {
            var username = snapshot.val();
            console.log(snapshot.val());
            console.log('hello student')

        })
    };



    render() {

        return (
            //import jon detail

            <div>
                <h2>This is where the Job Detail Goes with Job UID: {this.props.match.params.id}</h2>
                <ContactList/>
            </div>

        );
    }

}
export default JobSummary;
