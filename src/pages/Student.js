import React, { Component } from 'react';
import LeftPanelStudents from '../LeftPanelStudents';
import * as firebase from 'firebase';
import Logout from '../logout';

class Student extends Component {
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
    }
    render() {
        return (
            <div>
                
                <LeftPanelStudents {...this.props}/>
                <Logout {...this.props}/>
            </div>
        );
    }

}
export default Student;
