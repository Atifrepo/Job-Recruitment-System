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
        console.log(this.props.data);
        let newPostKey = database.ref().child('tasks').push().key;
        let updates = {};
        updates['/tasks/' + newPostKey] = this.props.data;
        updates['/user-tasks/' + auth.currentUser.uid + '/' + newPostKey] = this.props.data;
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
                        <NavLink className="btn btn-primary" to={"/jobSummary/" + this.state.taskId}>OK</NavLink>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default PostJobSuccess