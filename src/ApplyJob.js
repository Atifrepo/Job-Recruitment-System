import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import './signup.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ApplyJobSuccess from "./ApplyJobSuccess.js";

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class ApplyJob extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            myInfo: {
                fName: '',
                lName: '',
                e_mail: '',
                password: '',
                cPassword: '',
                country: '',
                city: '',
                Contact_Number: '',
                Passport_Number: '',
                NIC_Number: '',
                type: ''

            },
            fields: [],
            error: 'this is error'
        }
    }

    handleClick(event) {

        // firebase.auth().createUserWithEmailAndPassword(this.state.myInfo.e_mail, this.state.myInfo.password).catch(function (error) {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     console.log(errorMessage)
        // }).then(() => {
        //
        //     var uid = firebase.auth().currentUser.uid
        //     console.log('we are here');
        //     console.log(this.state.myInfo);
        //     console.log(uid);
        //     firebase.database().ref('USER' + '/' + uid).set({
        //         fname: this.state.myInfo.fName,
        //         lName: this.state.myInfo.lName,
        //         e_mail: this.state.myInfo.e_mail,
        //         password: this.state.myInfo.password,
        //         type: this.state.type
        //     });
        //
        // });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        console.log("Login Data is here ", this.props.location.data)
    }
    successMessage(event) {

        this.state.fields.push(this.state.myInfo);
        this.setState({
            fields: this.state.fields
        });
        console.log('hi there', this.state.myInfo);
        event.preventDefault();
    }

    inputChange(changeValue, event) {

        this.state.myInfo[changeValue] = event.target.value;
        console.log('event', event.target.value);
        this.setState({
            myInfo: this.state.myInfo
        });

    }
    SelectUserType(event) {
        this.setState({
            type: event.target.value
        })
        //console.log(this.state.type);
    }

    render() {
        return (

            <div >
                <form style={{'text-align': 'center'}}>
                    {/*<div>*/}
                    {/*    <AppBar style={{ border:'5px solid gray' ,  backgroundColor: '#212121' }} title='Sign Up' />*/}
                    {/*</div>*/}

                    <TextField
                        name="Name"
                        hintText="Full Name"
                        floatingLabelText="Full Name"
                        value={this.state.myInfo.Name}
                        onChange={this.inputChange.bind(this, "Name")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Phone"
                        hintText="Phone"
                        floatingLabelText="Phone"
                        value={this.state.myInfo.phone}
                        onChange={this.inputChange.bind(this, "Phone")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="e_mail"
                        hintText="e_mail"
                        floatingLabelText="e_mail"
                        value={this.state.myInfo.e_mail}
                        onChange={this.inputChange.bind(this, "e_mail")}
                        floatingLabelFixed
                    />
                    <br/>
                    <label className="mdc-text-field mdc-text-field--textarea">
                        <label className="mdc-floating-label" id="my-label-id">Please Describe Yourself</label>
                        <br/>
                        <textarea aria-labelledby="my-label-id" rows="6" cols="30"/>
                        <div className="mdc-notched-outline">
                            <div className="mdc-notched-outline__leading"/>
                            <div className="mdc-notched-outline__notch">
                            </div>
                            <div className="mdc-notched-outline__trailing"/>
                        </div>
                    </label>
                    <br/><br/>
                    <ApplyJobSuccess title="Submit" link="/market"/>
                </form>
            </div>

    )};
}
export default ApplyJob