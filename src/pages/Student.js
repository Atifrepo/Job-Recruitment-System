import React, {Component} from 'react';
import LeftPanelStudents from '../LeftPanelStudents';

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
                <LeftPanelStudents {...this.props}/>
            </div>
        );
    }

}

export default Student;
