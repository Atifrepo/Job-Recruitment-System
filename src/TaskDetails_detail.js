import React, {Component} from "react";
import './TaskDetails.css'
import Typography from "@material-ui/core/Typography";

const fakeData = {
    id: 0,
    taskTitle: "Feed my cat",
    userName: "Van",
    salary: "20",
    details: "I am going to leave school next week and I need some one who loves cat to" +
        "take care of my cat"
}

class TaskDetails_detail extends Component {
    render() {
        return (

            <div className="TaskInfo">
                <Typography variant="h6" align="center" component="h2" gutterBottom>
                    Task:
                    <h6>
                        {fakeData.taskTitle}
                    </h6>
                </Typography>
                <hr/>
                <Typography variant="h6" align="center" component="h2" gutterBottom>
                    Poster:
                    <h6>
                        {fakeData.userName}
                    </h6>
                </Typography>
                <hr/>
                <Typography variant="h6" align="center" component="h2" gutterBottom>
                    Task Description:
                    <h6>
                        {fakeData.details}
                    </h6>
                </Typography>
                <hr/>
                <Typography variant="h6" align="center" component="h2" gutterBottom>
                    Salary:
                    <h6>
                        {fakeData.salary}
                    </h6>
                </Typography>
                <hr/>

            </div>


        )
    }

}

export default TaskDetails_detail