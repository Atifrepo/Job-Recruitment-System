import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom'
import {auth, database} from "./firebase";
import {validate} from "validate.js";
import moment from 'moment';

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
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
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

let  constraints = {
    name: {
        presence: true
    },
    phone: {
        length: {is: 10},
        numericality: {
            onlyInteger: true
        },
        presence: true
    },
    e_mail: {
        presence: true,
        email:true
    },
    desc: {
        presence: true
    }
}


class ApplyJobSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }


    handleClickOpen = () => {
        let currentComponent = this;
        let alertMsg = validate(this.props.data, constraints);
        console.log(alertMsg);
        if(alertMsg){
            let res = "";
            for(let key of Object.keys(alertMsg)){
                res += (alertMsg[key][0] + '\n');
            }
            res += "Please verify your input.";
            alert(res);
        }else {
            let taskId = this.props.match.params.id;
            let newAppKey = database.ref().child('applicant').push().key;
            let updates = {};
            updates['/applicant/' + newAppKey] = this.props.data;
            updates['/task-applicant/' + taskId+'/' +newAppKey] = this.props.data;
            updates['/user-applicant/' + auth.currentUser.uid + '/' + newAppKey] = this.props.data;
            database.ref().update(updates, function (error) {
                if (error) {
                    alert("Something went wrong, please try again");
                } else {
                    // Data saved successfully!
                    currentComponent.setState({
                        applicantId: newAppKey,
                        taskId: taskId,
                        open: true
                    })
                }
            });
        };
    };
    handleClose = () => {
        this.setState({
            open: false
        });

    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    {this.props.title}
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Application Submitted
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Your application has been submitted.
                        </Typography>
                        <Typography gutterBottom>
                            The Job Poster will contact you any minute!
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <NavLink className="btn btn-primary" to={this.props.link}>OK</NavLink>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default ApplyJobSuccess