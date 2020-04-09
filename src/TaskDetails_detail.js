import React, {Component} from "react";
import './TaskDetails.css'
import Typography from "@material-ui/core/Typography";
import {auth, database} from "./firebase";

const fakeData = {
    id: 0,
    taskTitle: "Feed my cat",
    userName: "Van",
    salary: "20",
    details: "I am going to leave school next week and I need some one who loves cat to" +
        "take care of my cat"
};

class TaskDetails_detail extends Component {
    constructor() {
        super();
        this.state = {
            task_details: []
        }

    }

    componentDidMount() {
        let ref = database.ref("task/" + this.props.id);
        this.data = ref.on("value", (snapshot) => {
            let task = snapshot.val();
            this.setState({
                task_details: task
            });
        });
    }

    render() {
        const data  = this.state.task_details;
        return (

            <div className="TaskInfo">
                <Typography variant="h6" align="left" component="h2" gutterBottom>
                    Task:
                    <h6>
                        {data.title}
                    </h6>
                </Typography>
                <hr/>
                <Typography variant="h6" align="left" component="h2" gutterBottom>
                    Poster:
                    <h6>
                        {data.displayName}
                    </h6>
                </Typography>
                <hr/>
                <Typography variant="h6" align="left" component="h2" gutterBottom>
                    Task Description:
                    <h6>
                        {fakeData.details}
                    </h6>
                </Typography>
                <hr/>
                <Typography variant="h6" align="left" component="h2" gutterBottom>
                    Rewards:
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