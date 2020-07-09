import TextField from 'material-ui/TextField';
//import { Button } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import './signup.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import React, { Component } from 'react';
import FormError from './FormError';
import * as firebase from 'firebase';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',

            email: '',
            passOne: '',
            passTwo: '',
            errorMessage: null,

        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue }, () => {
            if (this.state.passOne !== this.state.passTwo) {
                this.setState({ errorMessage: 'Passwords no not match' });
            } else {
                this.setState({ errorMessage: null });
            }
        });
    }


    handleSubmit(e) {
        var registrationInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.passOne
        };
        e.preventDefault();

        firebase
            .auth()
            .createUserWithEmailAndPassword(
                registrationInfo.email,
                registrationInfo.password
            )
            .then(()=>{


                this.registerUser(registrationInfo.firstName);
               // this.props.history.push('/');


            })

            .catch(error => {
                if (error.message !== null) {
                    this.setState({ errorMessage: error.message });
                } else {
                    this.setState({ errorMessage: null });
                }
            });
    }

    registerUser = userName => {
        firebase.auth().onAuthStateChanged(FBUser => {
            FBUser.updateProfile({
                displayName: userName
            }).then(() => {
                this.setState({
                    user: FBUser,
                    firstName: FBUser.displayName,
                    userID: FBUser.uid
                });
                this.props.history.push('/');
            });
        });
    };

    render() {
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Register</h3>
                                    <div className="form-row">
                                        {this.state.errorMessage !== null ? (
                                            <FormError
                                                theMessage={this.state.errorMessage}
                                            />
                                        ) : null}
                                        <section className="col-sm-12 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="displayName"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="first Name"
                                                placeholder="First Name"
                                                name="firstName"
                                                required
                                                value={this.state.firstName}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="col-sm-12 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="lastName"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="lastName"
                                                placeholder="Last Name"
                                                name="last Name"
                                                required
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                    </div>
                                    <section className="form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </section>
                                    <div className="form-row">
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="passOne"
                                                placeholder="Password"
                                                value={this.state.passOne}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="passTwo"
                                                placeholder="Repeat Password"
                                                value={this.state.passTwo}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}



export default SignUp
