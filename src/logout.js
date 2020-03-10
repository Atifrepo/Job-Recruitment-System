import React, {Component} from 'react';
import * as firebase from 'firebase';
import './logout.css';
import {Button} from 'react-bootstrap';

class Logout extends Component {

    handleClick(event) {
        firebase.auth().signOut().then(() => {

            console.log(" Sign-out successful.")

        }).catch(function (error) {

            console.log(error);
        });
        this.props.history.push('/');

    }

    render() {
        return (
            <div id="navigation">
                <Button variant="contained" onClick={(event) => this.handleClick(event)}>Log Out </Button>
            </div>
        );
    }
}

export default Logout; 