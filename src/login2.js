import React, {Component} from 'react';
import {auth, database, googleAuthProvider, storage} from './firebase';

class Login2 extends Component {
    constructor() {
        super();

        this.state = {
            currentUser: {}
        }

        this.userRef = database.ref('/users').child('Anonymous');

        this.handleChange = this.handleChange.bind(this);
        this.displayCurrentUser = this.displayCurrentUser.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((currentUser) => {
            this.setState({currentUser: currentUser || {}});

            if (currentUser) {
                // Init current user Refs
                this.userRef = database.ref('/users').child(currentUser.uid);

                // Add user to users database if not exist
                this.userRef.once('value', (snapshot) => {
                    const userData = snapshot.val();
                    if (!userData) {
                        this.userRef.set({name: currentUser.displayName});
                    }
                });

            }
        });
    }

    // Form Events
    handleChange(event) {
        const newData = event.target.value;
        this.setState({newData})
    }

    // Auth Events
    signIn() {
        auth.signInWithPopup(googleAuthProvider);
    }

    signOut() {
        auth.signOut();
    }

    displayCurrentUser() {
        return <img className="App-nav-img" onClick={this.signOut}
                    src={this.state.currentUser.photoURL}
                    alt={this.state.currentUser.displayName}
        />
    }


    render() {
        return (
            <div><span>{JSON.stringify(this.state.currentUser, null, 5)}</span>
                <span className="App-nav-button">{this.state.currentUser.email ?
                    <a href="#" onClick={this.signOut}>sign out</a> :
                    <a href="#" onClick={this.signIn}>Sign In</a>}
                </span>


            </div>

        )

    }

}

export default Login2
