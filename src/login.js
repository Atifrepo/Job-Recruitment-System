import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import {Link} from 'react-router-dom'
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
        this.props.history.push('/market');
    }

    inputChange(changeValue, event) {

        this.state.myInfo[changeValue] = event.target.value;
        this.setState({
            myInfo: this.state.myInfo
        });

    }

    render() {
        return (
            <Container component="main" maxWidth="xs">

                <div>
                    <form>
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
                            <Button variant="contained">Don't have account?</Button>
                        </Link>
                    </form>
                </div>
            </Container>

        )

    }

}

export default Login
