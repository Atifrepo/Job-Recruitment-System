import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import './style.less'
import {NavLink} from "react-bootstrap";

class ContactItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        // 获取数据
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
                                <a href={`mailto:${item.email}`} style={{color:'#000000'}}>{item.email}</a>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>
        )
    }
}

export default ContactItem