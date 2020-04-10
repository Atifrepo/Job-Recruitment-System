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
import {auth, database} from "../firebase";


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
        let task_data = currentComponent.props.task_data;
        let applicant_data = currentComponent.props.applicant_data;
        let updates = {};

        updates['/applicant/' + task_data.task_id] = null;
        updates['/task-applicant/' + task_data.task_id+"/applicant/"+applicant_data.applicant_id] = null;
        updates['/user-applicant/' + auth.currentUser.uid+ "/applicant/" + applicant_data.applicant_id] = null;

        database.ref().update(updates, function (error) {
            if (error) {
                alert("Something went wrong, please try again");
            }
        });

    }

    handleClose = () => {
        this.setState({
            open: false
        });

    };


    render() {
        return (
            <div>
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                    {this.props.title}
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>

                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Are you sure to WITHDRAW the application?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={this.handleClose}>Go Back</button>
                        <NavLink className="btn btn-primary" onClick={this.handleConfirm} to={"/student"}>Withdraw</NavLink>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default SelectApplicantSuccess