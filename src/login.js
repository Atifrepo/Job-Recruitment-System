import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import * as firebase from 'firebase';
import FormError from './FormError';
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue });
    }

    handleSubmit(e) {
        var registrationInfo = {
            email: this.state.email,
            password: this.state.password
        };
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(
                registrationInfo.email,
                registrationInfo.password
            )
            .then(() => {
                this.props.history.push('/market');
            })
            .catch(error => {
                if (error.message !== null) {
                    this.setState({ errorMessage: error.message });
                } else {
                    this.setState({ errorMessage: null });
                }
            });
    }

    render() {
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Log in</h3>
                                    <section className="form-group">
                                        {this.state.errorMessage !== null ? (
                                            <FormError
                                                theMessage={this.state.errorMessage}
                                            />
                                        ) : null}
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="Email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            required
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </section>
                                    <section className="form-group">
                                        <input
                                            required
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </section>
                                    <div className="form-group ">
                                        <button className="btn btn-primary text-left col-sm-6 .btn-space" type="submit">
                                            Log in
                                        </button>

                                        <Link to={{
                                            pathname: '/Signup',


                                        }}>
                                            <button className="btn btn-primary  col-sm-6 .btn-space" >
                                                Don't have account?
                                            </button>
                                        </Link>

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

export default Login
