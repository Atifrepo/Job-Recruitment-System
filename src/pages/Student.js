import React, {Component} from 'react';
import LeftPanelStudents from '../LeftPanelStudents';
import {auth, database} from "../firebase";
import withAuthorization from "../withAuthorization";

class Student extends Component {
    constructor() {
        super();
        this.state = {
            firebase: ''
        }
    }



    render() {
        return (
            <div>
                <LeftPanelStudents {...this.props} />
            </div>
        );
    }

}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( Student);
