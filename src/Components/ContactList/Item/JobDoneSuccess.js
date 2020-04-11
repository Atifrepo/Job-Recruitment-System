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
import {auth, database} from "../../../firebase";


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

let constraints = {
    title: {
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
        email: true
    },
    reward: {
        numericality: {
            onlyInteger: true
        },
        presence: true
    },
    startDate: {
        datetime: {
            dateOnly: false,
            earliest: new Date(),
            message: " is Invalid."
        }
    },
    desc: {
        presence: true
    }
}

class SelectApplicantSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            taskId: null
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleConfirm = () => {
        let currentComponent = this;
        let data = currentComponent.props.data;
        let updates = {};
        updates['/task/' + data.task_id + '/status'] = "1.3";
        updates['/user-task/' + auth.currentUser.uid + '/task/' + data.task_id + '/status'] = "1.3";
        updates['/task-applicant/' + data.task_id + '/status'] = "1.3";
        updates['/task-applicant/' + data.task_id + '/applicant/'+data.applicant_id+"/status"] = "2.4";
        updates['/applicant/' + data.applicant_data + '/status'] = "2.4";
        updates['/user-applicant/' + data.applicant_user_id + '/applicant/' + data.applicant_id + '/status'] = "2.4";
        database.ref().update(updates, function (error) {
            if (error) {
                alert("Something went wrong, please try again");
            }
        });

    }

    //     let currentComponent = this;
    //     let newPostKey = database.ref().child('task').push().key;
    //     let data = this.props.data;
    //     data['task_id'] = newPostKey;
    //     data['status'] = "1.1";
    //     let updates = {};
    //     data['post_user_id'] = auth.currentUser.uid;
    //     updates['/task/' + newPostKey] = data;
    //     updates['/user-task/' + auth.currentUser.uid + '/task/' + newPostKey] = data;
    //     updates['/task-applicant/' + newPostKey] = data;
    //     database.ref().update(updates, function (error) {
    //         if (error) {
    //             alert("Something went wrong, please try again");
    //         } else {
    //             // Data saved successfully!
    //             currentComponent.setState({
    //                 taskId: newPostKey,
    //                 open: true
    //             })
    //         }
    //     });


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
                        Confirm Job-Well-Done?
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Are you sure the task has been completed?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={this.handleClose}>Go Back</button>
                        <button className="btn btn-primary" onClick={this.handleConfirm}>Confirm</button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default SelectApplicantSuccess