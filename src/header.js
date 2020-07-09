import React, {Component} from 'react'
import {auth, database} from './firebase';
import {Link} from 'react-router-dom'

const navStyle = {
    color: 'white'
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
        }

        this.userRef = database.ref('/users').child('Anonymous');

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

     render() {
        return (
            <nav>
                <Link style={navStyle} to="/"><h3>JobHunter</h3></Link>
                <ul className="nav-links">
                    <Link style={navStyle} style={{'color': '#fb601d'}} to="/postjob">
                        <li>Post Task</li>
                    </Link>
                    <Link style={navStyle} to="/market">
                        <li>Find Tasks</li>
                    </Link>
                    <Link style={navStyle} to="/student">
                        <li>My Tasks</li>
                    </Link>
                    {this.state.currentUser.email ?
                        <Link style={navStyle} to="/profile">
                            <li>My Account</li>
                        </Link>
                        :
                        <Link style={navStyle} to="/login">
                            <li>Sign In</li>
                        </Link>
                    }

                </ul>
            </nav>
        )
    }
}

export default Header