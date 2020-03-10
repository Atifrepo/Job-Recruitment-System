import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import './style.less'

class ContactItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const item = this.props.data;
        return (
            <div>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={item.userName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className="inline"
                                    color="textPrimary"
                                >
                                    Phone:
                                </Typography>
                                {item.phone}
                                <Typography/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className="inline"
                                    color="textPrimary"
                                >
                                    Email:
                                </Typography>
                                <a href={`mailto:${item.email}`} style={{color: '#000000'}}>{item.email}</a>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider/>
            </div>
        )
    }
}

export default ContactItem