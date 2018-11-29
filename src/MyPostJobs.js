import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import *as firebase from 'firebase';


class MyPostJobs extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            JobInfo: [{

                CompanyId: '', jobtitle: '', description: '', salary: '', key: ''
            }]

        }
    }

    componentDidMount() {
        console.log("in job post")

        var uid = firebase.auth().currentUser.uid;
        console.log("in job post" + uid)
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('Job/').orderByChild('CompanyId').equalTo(uid).once('value', snap => {
            var userobj = snap.val();
            console.log("userobj", userobj)
            var key = Object.keys(userobj);
            this.setState({ key })
            for (var i = 0; i < key.length; i++) {
                var k = key[i];

                if (uid == userobj[k].CompanyId) {
                    this.state.JobInfo[i] = {}
                    //  this.state.JobInfo=userobj[k].JobInfo;
                    this.state.JobInfo[i].jobtitle = userobj[k].jobtitle;
                    this.state.JobInfo[i].description = userobj[k].description;
                    this.state.JobInfo[i].salary = userobj[k].salary;
                }
            }
        }

        )
    }

    render() {
        console.log('jobinfo', this.state.JobInfo)
        // console.log('description', this.state.description)
        // console.log('salary', this.state.salary)
        return (

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>CompanyId</TableCell> */}
                            <TableCell >Job Title</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.JobInfo.map(row => {
                            return (

                                <TableRow key={row.CompanyId}>
                                    {/* <TableCell>{row.CompanyId}</TableCell> */}
                                    <TableCell >{row.jobtitle}</TableCell>
                                    <TableCell >{row.description}</TableCell>
                                    <TableCell >{row.salary}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


export default withStyles(styles)(MyPostJobs);