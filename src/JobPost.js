import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import ViewJobs from './ViewJobs';

class JobPost extends Component {
    constructor() {
        super();
        this.state = {
            jobInfo: {      
            user: '',
            jobtitle: '',
            description: '',
            salary: '',
            type: ''

            },
            fields: [],
        }
    }
    componentDidMount() {
        console.log("in job post")
    }
    PostJob() {
       
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref('Job/').push({
            
            jobtitle: this.state.jobtitle,
            description: this.state.description,
            salary: this.state.salary,
            CompanyId: uid
            
        });
    }

    // // successMessage(event) {

    // //     this.state.fields.push(this.state.jobInfo);
    // //     this.setState({
    // //         fields: this.state.fields
    // //     })
    // //     console.log('hi there', this.state.JobPost)
    // //     event.preventDefault();
    // }

inputChange(changeValue, event) {
    this.state[changeValue] = event.target.value;
    console.log('event', event.target.value);
    this.setState({
       jobInfo: this.state.jobInfo
   });

}

    render() {
        return (
            <div>
                <MuiThemeProvider style={{ backgroundColor: '#212121' }}>
                    <div style={{ backgroundColor: '#BDBDBD' }}>
                        {/* <AppBar style={{ backgroundColor: '#212121' }} title="Post New Job" /> */}
                        <TextField 
                            hintText='Job Title'
                            floatingLabelText='Job Title'
                            // onChange={(event, newValue) => this.setState({ title: newValue })}
                            onChange={this.inputChange.bind(this, "jobtitle")}
                        />
                        <br></br>
                  <TextField
                            hintText='Job-Description'
                            floatingLabelText='Desciption'
                            value={this.state.description}
                           // onChange={(event, newValue) => this.setState({ description: newValue })}
                           onChange={this.inputChange.bind(this, "description")}
                       />
                        <br></br>
                        <TextField
                            hintText='Salary'
                            floatingLabelText='Salary'
                            //onChange={(event, newValue) => this.setState({ salary: newValue })}

                            onChange={this.inputChange.bind(this, "salary")}
                        />
                        <br></br>
                        <Button variant="contained" onClick={(event) => this.PostJob(event)}><b>Post Job</b></Button>

                    </div>

                </MuiThemeProvider>
            </div>
        )
    }


}
export default JobPost;
