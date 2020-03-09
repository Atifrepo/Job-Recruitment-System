import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button'

import './Market.css'
import Link from "@material-ui/core/Link";
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";

const tasksData = [
    {
        id: 0,
        taskTitle: "Feed my cat",
        userName: "Van",
        salary: "20",
        details: "I am going to leave school next week and I need some one who loves cat to" +
            "take care of my cat"
    },

    {
        id: 1,
        taskTitle: "Help with the sociological research",
        userName: "Pro.Big",
        salary: "30",
        details: "need a grad student to participate every friday, up to 50 dollars"
    },

    {
        id: 2,
        taskTitle: "Chat with my grandma",
        userName: "Grandson",
        salary: "10",
        details: "Help me chat with my grandma on We-chat every weekend, easy money!"

    }

];

class Market extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskInfo: [{
                id: '', taskTitle: '', userName: '', salary: '', details: ''
            }]
        }
    }


    handleSearchClick() {

    }





    render() {
        return (
            <Container fixed>
                <div className="Market">
                    <hr/>
                    <h1 className="MarketHeader">Task Market</h1>
                    <label>
                        <TextField id="filled-basic"  variant="filled" label={"Search task here"}/>
                        <Button variant = "contained" color = "primary" size = "large" style = {{padding:"14.5px 5px"}} onClick={this.handleSearchClick}>Search</Button>
                    </label>


                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Task Title</TableCell>
                                    <TableCell align="left">User Name</TableCell>
                                    <TableCell align="left">Salary</TableCell>
                                    <TableCell align="right">Post Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tasksData.map(row => (
                                        <TableRow key = {row.id}>
                                            <TableCell align="left" component="th" scope="row">
                                                <Link href={`/jobdetail/${row.id}`}>{row.taskTitle}</Link>
                                            </TableCell>
                                            <TableCell align="left">{row.userName}</TableCell>
                                            <TableCell align="left">{row.salary}</TableCell>
                                            <TableCell align="left">{}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/*<div className="MarketList">*/}
                    {/*    {tasksData.map(item => (*/}
                    {/*        <div key={item.id}>*/}
                    {/*            <Link to={`/student/Market/${item.id}`}>Task: {item.taskTitle}</Link>*/}
                    {/*            <div>Name: {item.userName}</div>*/}
                    {/*            <hr/>*/}
                    {/*        </div>*/}
                    {/*    ))*/}
                    {/*    }*/}
                    {/*</div>*/}

                </div>
            </Container>
        )
    }
}


export default Market