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
import {auth, database} from "./firebase";
import {convertTime} from "./timeFormat";

class Market extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            loading: true
        }
    }

    componentDidMount() {
        let ref = database.ref("task");
        this.data = ref.on("value", (snapshot) => {
            const task = [];
            snapshot.forEach(data => {
                task.push(data.val());
            });
            this.setState({
                tasks: task,
                loading: false
            });
        });
    }


    //TODO: Search
    handleSearchClick() {
        // console.log("clicked!");
        // database.ref.on("value", function(snapshot) {
        //     console.log(snapshot.val());
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });
        // console.log(tasksData);
    }


    render() {
        return this.state.loading ? (
            <div>
                loading...
            </div>
        ) : (
            <Container fixed>
                <div className="Market">
                    <hr/>
                    <h1 className="MarketHeader">Task Market</h1>
                    <label>
                        <TextField id="filled-basic" variant="filled" label={"Search task here"}/>
                        <Button variant="contained" color="primary" size="large" style={{padding: "14.5px 5px"}}
                                onClick={this.handleSearchClick}>Search</Button>
                    </label>


                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Task Title</TableCell>
                                    <TableCell align="left">Desc</TableCell>
                                    <TableCell align="left">Reward</TableCell>
                                    <TableCell align="left">Post Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.tasks.map(row => (
                                        <TableRow key={row.task_id}>
                                            <TableCell align="left" component="th" scope="row">
                                                <Link href={`/jobdetail/${row.task_id}`}>{row.title}</Link>
                                            </TableCell>
                                            <TableCell
                                                align="left">{row.desc.length > 20 ? row.desc.substring(0, 20) + "..." : row.desc}</TableCell>
                                            <TableCell align="left">{row.reward}</TableCell>
                                            <TableCell align="left">{convertTime(row.postDate)}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        )
    }
}


export default Market