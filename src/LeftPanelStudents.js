import React, {Component} from 'react';
import './LeftPanelStudents.css';
import {Redirect} from 'react-router-dom';
import JobList from "./Components/JobList";
import JobListApply from "./Components/JobListApply";
import Divider from "@material-ui/core/Divider";
import Logout from "./logout";

class LeftPanelStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'guanzhou'
        }
    }

    render() {
        return (
            <div>
                <div>

                    {this.state.user ?
                        <div>

                            <div style={{backgroundColor: '#152938', height: 50}}>
                                <h2 style={{color: '#FFFFFF', paddingLeft: '10px'}}>My Task: {this.state.user}</h2>

                            </div>
                            <div style={{margin: 'auto', height: 'auto', overflow: 'auto', backgroundColor: '#1f3b51'}}>
                                <h3 style={{color: '#FFFFFF', paddingLeft: '10px'}}>My Post</h3>
                                <Divider/>
                                <JobList/>
                            </div>
                            <div style={{margin: 'auto', height: 'auto', overflow: 'auto', backgroundColor: '#4b6273'}}>
                                <h3 style={{color: '#FFFFFF', paddingLeft: '10px'}}>My Application</h3>
                                <Divider/>
                                <JobListApply/>
                            </div>

                        </div>


                        :
                        //if not log in, redirect to login page.
                        <Redirect to="/"/>
                    }


                </div>
                <Logout {...this.props}/>
            </div>
        )
    }
}

export default LeftPanelStudents;