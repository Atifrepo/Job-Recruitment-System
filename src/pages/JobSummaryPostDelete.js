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
        let data = currentComponent.props.data;
        let updates = {};

        updates['/task/' + data.task_id] = null;
        updates['/task-applicant/' + data.task_id] = null;
        updates['/user-task/' + auth.currentUser.uid+ "/task/" + data.task_id] = null;

        let ref = database.ref('/task-applicant/' + data.task_id + '/applicant');
        this.data = ref.on("value", (snapshot) => {
            snapshot.forEach(data_app => {

                let app_id = data_app.val()['applicant_id'];
                let app_user_id = data_app.val()['applicant_user_id'];
                updates['/applicant/' + app_id ] = null;
                updates['/user-applicant/' + app_user_id + '/applicant/' + app_id ] = null;
            });
        });

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
                            Are you sure to DELETE the post?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-primary" onClick={this.handleClose}>Go Back</button>
                        <NavLink className="btn btn-primary" onClick={this.handleConfirm} to={"/student"}>Delete</NavLink>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default SelectApplicantSuccess