import React, { Component } from 'react';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';


class StudentDetails extends Component {

    constructor() {
        super();
        this.state = {

            user: '',
            Name: '',
            DegreeTitle: '',
            UniversityName: '',
            FromDate: '',
            ToDate: '',
            GPA: '',
            Division: '',
            EnrollmentNumber: ''
        }


    }
    componentDidMount() {
        console.log('student detail')



        var userId = firebase.auth().currentUser.uid;
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('USER/' + userId);
        var userobj;
        speedRef.on('value', snap => {
            userobj = snap.val();

            this.setState({
                user: userobj

            })
            console.log("user state :" + this.state.user)

        })
    }

    UpdateStudentDetails(event) {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('USER/' + userId).set({
            ...this.state.user,

            Name: this.state.Name,
            DegreeTitle: this.state.DegreeTitle,
            UniversityName: this.state.UniversityName,
            FromDate: this.state.FromDate,
            ToDate: this.state.ToDate,
            GPA: this.state.GPA,
            Division: this.state.Division,
            EnrollmentNumber: this.state.EnrollmentNumber,

        })
    }

    render() {
        return (


            <MuiThemeProvider>
                <div style={{ backgroundColor: '#BDBDBD' }}>
                    <AppBar style={{ backgroundColor: '212121' }} />
                    <TextField
                        hintText="Enter your Full Name"
                        floatingLabelText="Name"
                        onChange={(event, newValue) => this.setState({ Name: newValue })}
                    />
                    <br />
                    <TextField
                        hintText="Degree Title"
                        floatingLabelText="Degree Title"
                        onChange={(event, newValue) => this.setState({ DegreeTitle: newValue })}
                    />
                    <br />
                    <TextField
                        hintText="University Name"
                        floatingLabelText="University Name"
                        onChange={(event, newValue) => this.setState({ UniversityName: newValue })}
                    />
                    <br />
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        //defaultValue="2017-05-24"
                        //className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br ></br>
                    <br />
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        //defaultValue="2017-05-24"
                        //className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <TextField
                        hintText="GPA"
                        floatingLabelText="GPA"
                        onChange={(event, newValue) => this.setState({ GPA: newValue })}
                    />
                    <br />
                    <TextField
                        hintText="Division"
                        floatingLabelText="Division"
                        onChange={(event, newValue) => this.setState({ Division: newValue })}
                    />
                    <br />
                    <TextField
                        hintText="Enrollment Number"
                        floatingLabelText="Enrollment Number"
                        onChange={(event, newValue) => this.setState({ EnrollmentNumber: newValue })}
                    />
                    <br />

                    <br />
                    <Button variant="contained" onClick={this.UpdateStudentDetails.bind(this)}><b>Submit</b></Button>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default StudentDetails;


