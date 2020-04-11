import React, {Component} from "react";
import Button from '@material-ui/core/Button'

import './TaskDetails.css'
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TaskDetails_detail from "./TaskDetails_detail";
import {auth} from "./firebase"
import withAuthorization from "./withAuthorization";

class TaskDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            uid: null
        }

    }
    componentDidMount() {
        auth.onAuthStateChanged((user)=> {
            if (user) {
                this.setState({
                    uid:user.uid
                })
                console.log(user.uid);
            } else {
                // No user is signed in.
                console.log('There is no logged in user');
            }
        });
        console.log(this.state)
    }


    render() {
console.log(this.state.uid);
        return this.state.uid ? (<Container fixed>
                <hr/>
                <div className="Task">
                    {this.state.uid}
                    <h1 className="TaskHeader">Task Details</h1>
                    <Paper elevation={5}>
                        {this.state.uid}
                        {auth.currentUser.uid}
                        <TaskDetails_detail id={this.props.match.params.id}/>
                        <Button variant="contained" color="primary"
                                href={'/apply/' + this.props.match.params.id}>Apply</Button>
                        <Button variant="contained" color="red" href={'/market'}>Back</Button>

                    </Paper>
                </div>
            </Container>

        ) : (<div>Loading</div>);
    }

}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( TaskDetails);