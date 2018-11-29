import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { Button } from 'react-bootstrap'
import EditIcon from 'material-ui/svg-icons/image/edit'

import RaisedButton from 'material-ui/RaisedButton';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as firebase from 'firebase';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
import { throws } from 'assert';
import { Tab } from '@material-ui/core';


class ViewJobs extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      JobInfo: [{

        CompanyId: '', jobtitle: '', description: '', salary: '', key: '', email: '', Apply:''
      }]

    }
  }

  componentDidMount() {

    //var currentUserType=firebase.auth().currentUser.type;
    var currentUserEmail = firebase.auth().currentUser.email
    console.log('currentuser email' + currentUserEmail)
    var email = currentUserEmail;
    console.log('email', email)
    var uid = firebase.auth().currentUser.uid
    console.log('current id' + uid)
    const rootRef = firebase.database().ref();
    var speedRef = rootRef.child('Job/');
    speedRef.on('value', snap => {
      var uid = firebase.auth().currentUser.email;
      var userobj = snap.val();
      var key = Object.keys(userobj);
      this.setState({ key })
      for (var i = 0; i < key.length; i++) {
        var k = key[i];

        // console.log('a',userobj[k]);

        if (userobj[k]) {
          this.state.JobInfo[i] = {};

          this.state.JobInfo[i].CompanyId = userobj[k].CompanyId;
          this.state.JobInfo[i].jobtitle = userobj[k].jobtitle;
          this.state.JobInfo[i].description = userobj[k].description;
          this.state.JobInfo[i].salary = userobj[k].salary;

        }
        else { console.log("anything", userobj[i].JobInfo) }
      }


      // if(userobj[k].type=='Admin') {

      // }


      this.setState({ JobInfo: this.state.JobInfo,key: this.state.key  })
     // this.setState({ key: this.state.key })
      //  this.setState({email:this.state.e_mail})
    })
  }

  DeleteRecord(row) {

    console.log('row', row);

    var indexValue = this.state.key[row]
    firebase.database().ref('Job/' + indexValue).remove();
    console.log('index value' + indexValue)

  }

  Apply(row) {
    var indexValue = this.state.key[row]
    console.log('index value' + indexValue)
    // var CompanyId=firebase.auth().CompanyId;
    var key = this.state.key
    console.log('key' + key)
    console.log('in apply job')
    var currentUser = firebase.auth().currentUser;
    console.log('Current User' + currentUser)
    var currentId = firebase.auth().currentUser.uid;
    console.log('current id' + currentId)

    var rootRef = firebase.database().ref();
    const speedRef = rootRef.child('USER/' + currentId);
    speedRef.on("child_added", snap => {
      var values = snap.val();

      let obj = (snap.val() || {
        LName: values.lName,
        email: values.email,
        userId: currentId

      })
      rootRef = firebase.database().ref();
      const speedRef = rootRef.child("Job/" + this.state.key[row] +"/Apply/" + indexValue).set(obj)


    })


  }


  render() {


    // console.log('jobtitle', this.state.JobInfo)

    return (

      <Paper style={{ backgroundColor: '#BDBDBD' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell >Job Title</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Salary</TableCell>
              {/* <TableCell ><RaisedButton></RaisedButton></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.JobInfo.map((row, i) => {
              return (
                <TableRow key={row.id}>

                  <TableCell >{row.CompanyId}</TableCell>
                  <TableCell >{row.jobtitle}</TableCell>
                  <TableCell >{row.description}</TableCell>
                  <TableCell>{row.salary}</TableCell>

                  {/* {this.state.email == "owner@admin.com" ? <TableCell >{row.salary}</TableCell>: <TableCell >xxxx</TableCell>} */}
                  <TableCell >
                  <Button onClick={(id) => this.DeleteRecord(i)} >delete job</Button>
                  </TableCell>
                  
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
export default withStyles(styles)(ViewJobs);