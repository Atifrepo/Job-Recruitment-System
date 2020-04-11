import React from 'react';
import {Link} from "react-router-dom";
import withAuthorization from "./withAuthorization";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Guanzhou",
            lastName: "Song",
            email: "song@gmail.com",
            password: "****",
            phone: "1234567",

        };
    }

    render() {
        return (
            <div className="container-fluid" style={{background: "#e6e6e6", height: "100vh"}}>
                <div className="container">
                    <h1>
                        Profile
                    </h1>
                    <div className="p-2" style={{background: "#FFFFFF"}}>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                <span className="mr-2">First Name</span>
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control" id="username"
                                       value={this.state.firstName} placeholder="Mike"
                                       onChange={(event) => this.setState({firstName: event.target.value})
                                       }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                <span className="mr-2">Last Name</span>
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control" id="username"
                                       value={this.state.lastName} placeholder="Shah"
                                       onChange={(event) => this.setState({lastName: event.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">
                                <span className="mr-2">Phone</span>
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control" id="phone"
                                       value={this.state.phone} placeholder="(555) 123-4324"
                                       onChange={(event) => this.setState({phone: event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">
                                <span className="mr-2">Email</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email"
                                       value={this.state.email} placeholder="alice@wonderland.com"
                                       onChange={(event) => this.setState({email: event.target.value})}
                                />
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <button className="btn btn-primary btn-block btn-success"
                                        onClick={(e) => {

                                            this.setState({
                                                firstName: this.state.firstName,
                                                lastName: this.state.lastName,
                                                phone: this.state.phone,
                                                email: this.state.email
                                            });
                                            alert("Your profile has been updated")
                                        }}>
                                    Update
                                    <i className="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>
                        <div className="form-group row">
                            <lable className="col-sm-2 col-form-label"></lable>
                            <div className="col-sm-10">

                                <Link to={'/'}>
                                    <button className="btn  btn-block btn-danger"
                                    > Logout
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( Profile);
