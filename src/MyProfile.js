import React from 'react';
import {Link} from "react-router-dom";

import firebase from './firebase'
import withAuthorization from "./withAuthorization";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null,
            username:'',
            firstName:'',
            lastName:'',
            passwordOne:'',
            passwordTwo:'',
            email: '',
            phone: '',
            error:null

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.profileUpdate=this.profileUpdate.bind(this)

    }

    componentDidMount(){

        firebase.auth().onAuthStateChanged(u=>{
            console.log(u)
            if(u){
                this.setState({
                    user: u,
                    username: u.displayName,
                    email:u.email

                });




               /* profileRef.on('value', snapshot=>{
                    let profile = snapshot.val()
                    if(profile.firstName!=null && profile.lastName!=null && profile.phone!=null){

                    this.setState({

                        firstName: profile.firstName,
                        lastName:profile.lastName,
                        phone: profile.phone


                    })}
                })*/



            }
           /*
            const profileRef= firebase.database().ref(`profile`+u.uid)
            profileRef.on('value', snapshot=>{
                let profile = snapshot.val()

                this.setState({

                    firstName: profile.firstName,
                    lastName:profile.lastName,
                    phone: profile.phone


                })
            })

        });*/



    })}



    profileUpdate(){

        let user = firebase.auth().currentUser
        const ref = firebase
            .database()
            .ref(`profile/${user.uid}`);
        ref.push({

            username: this.state.username,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            phone:this.state.phone,
            email: this.state.email

        });

        console.log(this.state)

    }

  onSubmit =event =>{


      firebase.auth().onAuthStateChanged(u=>{
          console.log(u)
          if(u) {
              u.updatePassword(this.state.passwordTwo).then(()=>{
                  alert('you have reset your password')
              })

          }
              });


  }



    logOutUser = e => {
        e.preventDefault();
        this.setState({
            displayName: null,
            userID: null,
            user: null
        });

        firebase
            .auth()
            .signOut()
            .then(() => {
                this.props.history.push('/');
            });
    };


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
                                <span className="mr-2">Username</span>
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control" id="username"
                                       value={this.state.username} placeholder="Mike"
                                       onChange={(event) => this.setState({username: event.target.value})
                                       }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label">
                                <span className="mr-2">First Name</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="firstname"
                                       value={this.state.firstName} placeholder="alice"
                                       onChange={(event) => this.setState({firstName: event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                <span className="mr-2">Last Name</span>
                            </label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email"
                                       value={this.state.lastName} placeholder="wonderland"
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
                                        onClick={this.profileUpdate}

                                        >
                                    Update
                                    <i className="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>
                        <div className="form-group row">
                            <lable className="col-sm-2 col-form-label"></lable>
                            <div className="col-sm-10">


                                    <button className="btn  btn-block btn-danger" onClick={this.logOutUser}
                                    > Logout
                                    </button>

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
