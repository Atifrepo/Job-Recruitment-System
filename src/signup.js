import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
//import { Button } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import './signup.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class SignUp extends Component {
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
            error: 'this is error'
        }
    }

    handleClick(event) {
        this.props.history.push("/")
    }

    componentDidMount() {
        console.log("Login Data is here ", this.props.location.data)
    }

    inputChange(changeValue, event) {

        this.state.myInfo[changeValue] = event.target.value;
        console.log('event', event.target.value);
        this.setState({
            myInfo: this.state.myInfo
        });

    }

    render() {
        return (
            <Container component="main" maxWidth="xs">

                <div>
                    <form>
                        <div>
                            <AppBar style={{border: '5px solid gray', backgroundColor: '#212121'}} title='Sign Up'/>
                        </div>

                        <TextField
                            name="fName"
                            hintText="First Name"
                            floatingLabelText="First Name"
                            value={this.state.myInfo.fName}
                            onChange={this.inputChange.bind(this, "fName")}
                            floatingLabelFixed
                        />
                        <br></br>

                        <TextField
                            name="lName"
                            hintText="Last Name"
                            floatingLabelText="Last Name"
                            value={this.state.myInfo.lName}
                            onChange={this.inputChange.bind(this, "lName")}
                            floatingLabelFixed
                        />
                        <br></br>

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
                            floatingLabelText="password"
                            value={this.state.myInfo.password}
                            onChange={this.inputChange.bind(this, "password")}
                            type="password"
                            floatingLabelFixed
                        />
                        <br></br>
                        <Button variant="contained" onClick={this.handleClick.bind(this)}><b>Sign Up</b></Button>

                    </form>
                </div>
            </Container>
        )
    }
}

export default SignUp
