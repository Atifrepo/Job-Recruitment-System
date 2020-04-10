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
        email:true
    },
    reward:{
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

class PostJobSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            taskId: null
        }
    }

    handleClickOpen = () => {
        let currentComponent = this;
        validate.extend(validate.validators.datetime, {
            // The value is guaranteed not to be null or undefined but otherwise it
            // could be anything.
            parse: function(value, options) {
                return +moment.utc(value);
            },
            // Input is a unix timestamp
            format: function(value, options) {
                var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
                return moment.utc(value).format(format);
            }
        });
        console.log(this.props.data);
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
            let newPostKey = database.ref().child('task').push().key;
            let data = this.props.data;
            data['task_id'] = newPostKey;
            data['status'] = "1.1";
            let updates = {};
            data['post_user_id'] = auth.currentUser.uid;
            data['name'] = auth.currentUser.displayName;
            updates['/task/' + newPostKey] = data;
            updates['/user-task/' + auth.currentUser.uid + '/task/' + newPostKey] = data;
            updates['/task-applicant/' + newPostKey] = data;
            database.ref().update(updates, function (error) {
                if (error) {
                    alert("Something went wrong, please try again");
                } else {
                    // Data saved successfully!
                    currentComponent.setState({
                        taskId: newPostKey,
                        open: true
                    })
                }
            });
        }
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
                        Job Posted
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Your Job has been Posted.
                        </Typography>
                        <Typography gutterBottom>
                            The Job Hunter will apply any minute!
                        </Typography>
                        <Typography gutterBottom>
                            Check back later and contact your candidate for future actions.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <NavLink className="btn btn-primary" to={"/jobdetail/" + this.state.taskId}>OK</NavLink>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default PostJobSuccess