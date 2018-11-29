import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Button from 'react-bootstrap-validation';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import RaisedButton from 'material-ui/RaisedButton';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//  '

import *as firebase from 'firebase';
import { join } from 'path';
class ViewCompany extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      e_mail: [{ email: '', name: '' }]
    }
  }
  componentDidMount() {

    // var uid = firebase.auth().currentUser.uid;
    const rootRef = firebase.database().ref();
    var speedeRef = rootRef.child('USER');
    speedeRef.on('value', snap => {

      var count = 0;
      var userobj = snap.val();
      var key = Object.keys(userobj);
      for (var i = 0; i < key.length; i++) {
        var k = key[i];

        console.log(userobj[k].type);
        if (userobj[k].type == 'company') {                
          if (userobj[k]) {
            console.log("s", userobj[k].e_mail)
            this.state.e_mail[i] = {};

            this.state.e_mail[i].email = userobj[k].e_mail;
            this.state.e_mail[i].fname = userobj[k].fname;
          
          } else { console.log("s", userobj[i].e_mail) }

          //this.state.name[i]=userobj[k],name;
          //console.log("s",userobj[k])

        }
      }
      this.setState({ e_mail: this.state.e_mail })


    })
  }





  // const rows = [
  //   createData('e_mail' ),
  // //   createData('Ice cream sandwich'),
  // //   createData('Eclair'),
  // //   createData('Cupcake'),
  // //   createData('Gingerbread'),
  // ];

  


  render() {




    // const { classes } = props;
    console.log("email", this.state.e_mail)
    console.log("lName",this.state.fname)
    console.log("GPA",this.state.GPA)
    return (

      <Paper >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell >Email</TableCell>
              {/* <TableCell >Degree Title</TableCell>
              <TableCell >University Name</TableCell>
              <TableCell >From Date</TableCell>
              <TableCell >To Date</TableCell>
              <TableCell >GPA</TableCell>
              <TableCell >Division</TableCell>
              <TableCell >Enrollment Number</TableCell>
              <TableCell ></TableCell> */}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.e_mail.map(row => {
              return (
                <TableRow key={row.id}>


                  <TableCell >{row.fname}</TableCell>
                  <TableCell >{row.email}</TableCell>
                  {/* <TableCell >{row.DegreeTitle} </TableCell>
                  <TableCell >{row.UniversityName}</TableCell>
                  <TableCell >{row.FromDate}</TableCell>
                  <TableCell >{row.ToDate} </TableCell>
                  <TableCell >{row.GPA}</TableCell>
                  <TableCell >{row.Division}</TableCell>
                  <TableCell >{row.EnrollmentNumber} </TableCell> */}
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


export default withStyles(styles)(ViewCompany)
