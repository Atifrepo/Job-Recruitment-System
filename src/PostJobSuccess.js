import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom'

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


class PostJobSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false
        }
    }



     handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
     handleClose = () => {
         this.setState({
             open: false
         });

    };
render(){
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
                        The Job Hunter will contact you any minute!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    {/*<Button variant="outlined" autoFocus onClick={this.handleClose} color="blue" >*/}
                        <NavLink className="btn btn-primary"  to={this.props.link}>OK</NavLink>
                    {/*</Button>*/}
                </DialogActions>
            </Dialog>
        </div>
    );
}

}

export default PostJobSuccess