import React, {Component} from "react";
import Button from '@material-ui/core/Button'

import './TaskDetails.css'
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TaskDetails_detail from "./TaskDetails_detail";

const fakeData = {
    id: 0,
    taskTitle: "Feed my cat",
    userName: "Van",
    salary: "20",
    details: "I am going to leave school next week and I need some one who loves cat to" +
        "take care of my cat"
}

class TaskDetails extends Component {
    render() {
        return (
            <Container fixed>
                <hr/>
                <div className="Task">
                    <h1 className="TaskHeader">Task Details</h1>
                    <Paper elevation={5}>
                        <TaskDetails_detail id={0}/>
                                <Button variant="contained" color="primary" href={'/apply'}>Apply</Button>
                                <Button variant="contained" color="red" href={'/market'}>Back</Button>

                    </Paper>
                </div>
            </Container>

    )
    }

    }

    export default TaskDetails