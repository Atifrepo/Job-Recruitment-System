import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';

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


            },
            fields: [],
            // error: 'this is error'
        }
    }

    handleClick(event) {
        // firebase.auth().signInWithEmailAndPassword(this.state.myInfo.e_mail, this.state.myInfo.password).then((sucess, error) => {
        //     // var errorCode = error.code;
        //     // var errorMessage = error.message;
        //     // if (errorCode === 'auth/wrong-password') {
        //     //     alert('Wrong password.');
        //     // } else {
        //     //     alert(errorMessage);
        //
        //     // var typeCheck;
        //     // var userId = firebase.auth().currentUser.uid;
        //     // const rootRef = firebase.database().ref();
        //     // const speedRef = rootRef.child('USER/' + userId);
        //     // speedRef.on('value', snap => {
        //     //
        //     //
        //     //
        //     // })

            this.props.history.push('/market');

            // if (error) {
            //    console.log('error');
            // }
            // if (sucess) {
            //     console.log('success');
            // }
            // // }
            // //alert('error', error,'sucess', sucess);
        // }).catch((error) => {
        //     alert('invalid email or password', error);
        // })




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
            <Container component="main" maxWidth="xs">

                <div>
                    <form>
                        {/*<div>*/}
                        {/*    <AppBar style={{ backgroundColor: '#212121' }} title='Login' ></AppBar>*/}
                        {/*</div>*/}
                        <TextField
                            name="Email"
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
            </Container>

        )

    }

}
export default Login
