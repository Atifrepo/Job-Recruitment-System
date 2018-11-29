import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import * as firebase from 'firebase';
import AppBar from 'material-ui/AppBar/AppBar';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            myInfo: {
                fName: '',
                lName: '',
                e_mail: '',
                password: '',
                cPassword: '',
                country: '',
                city: '',
                Contact_Number: '',
                Passport_Number: '',
                NIC_Number: '',
                 type: ''

            },
            fields: [],
            // error: 'this is error'
        }
    }

    handleClick(event) {
        firebase.auth().signInWithEmailAndPassword(this.state.myInfo.e_mail, this.state.myInfo.password).then((sucess, error) => {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // if (errorCode === 'auth/wrong-password') {
            //     alert('Wrong password.');
            // } else {
            //     alert(errorMessage);

            var typeCheck;
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('USER/' + userId);
            speedRef.on('value', snap => {
                typeCheck = snap.val().type;
                //console.log(typeCheck);
                
                if (typeCheck == 'student') {

                    this.props.history.push('/student');
                    console.log("if k andr hun");
                }
                // console.log('Hello Student!');

                if (typeCheck == 'company') {

                    this.props.history.push('/company');
                    console.log(typeCheck);
                }
                //console.log('hello Company');
                if (typeCheck == 'Admin') {
                    this.props.history.push('/Admin');
                }

            })



            // if (error) {
            //    console.log('error');
            // }
            // if (sucess) {
            //     console.log('success');
            // }
            // // }
            // //alert('error', error,'sucess', sucess);
        }).catch((error) => {
            alert('invalid email or password', error);
        })




    }

    // successMessage(event) {

    //     this.state.fields.push(this.state.myInfo);
    //     this.setState({
    //         fields: this.state.fields
    //     })
    //     console.log('hi there', this.state.myInfo)
    //     event.preventDefault();
    // }

    inputChange(changeValue, event) {

        this.state.myInfo[changeValue] = event.target.value;
        //       console.log('event', event.target.value);
        this.setState({
            myInfo: this.state.myInfo
        });

    }

    render() {
        return (


            <div>
                <form>
                    <div>
                        <AppBar style={{ backgroundColor: '#212121' }} title='Login' ></AppBar>
                    </div>
                    <TextField
                        name="e_mail"
                        hintText="Email"
                        floatingLabelText="Email"
                        value={this.state.myInfo.e_mail}
                        onChange={this.inputChange.bind(this, "e_mail")}
                        floatingLabelFixed

                    />
                    <br></br>


                    <TextField
                        name="password"
                        hintText="Password"
                        floatingLabelText="Password"
                        value={this.state.myInfo.password}
                        onChange={this.inputChange.bind(this, "password")}
                        type="password"
                        floatingLabelFixed
                    />
                    <br></br>



                    <Button variant="contained" onClick={(event) => this.handleClick(event)}><b>login</b></Button>
                    <Link to={{
                        pathname: '/Signup',
                        data: this.state.myInfo


                    }}>
                        <Button variant="contained" >Don't have account?</Button>
                    </Link>
                </form>
            </div>

        )

    }

}
export default Login
