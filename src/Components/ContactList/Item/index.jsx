import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import './style.less'
import SelectApplicantSuccess from "./SelectApplicantSuccess";

class ContactItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleClick() {

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
                                    Name:
                                </Typography>

                                {item.name}
                                <Typography/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className="inline"
                                    color="textPrimary"
                                >
                                    Phone:
                                </Typography>

                                {this.props.hide ?
                                    "***-***-" + item.phone.substr(6, 4) :
                                    item.phone
                                }
                                <Typography/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className="inline"
                                    color="textPrimary"
                                >
                                    Email:
                                </Typography>
                                <a href={`mailto:${item.email}`} style={{color: '#000000'}}>{item.e_mail}</a>
                                <Typography/>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className="inline"
                                    color="textPrimary"
                                >
                                    Description:
                                </Typography>

                                {item.desc}
                                <Typography/>
                            </React.Fragment>
                        }
                    />
                    {this.props.enableChoice ? <SelectApplicantSuccess data={item} title={"Pick this Candidate"}></SelectApplicantSuccess> : <div/>}
                </ListItem>
                <Divider/>
            </div>
        )
    }
}

export default ContactItem