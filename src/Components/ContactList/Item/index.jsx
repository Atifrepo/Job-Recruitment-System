import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import './style.less'
import SelectApplicantSuccess from "./SelectApplicantSuccess";
import JobDoneSuccess from "./JobDoneSuccess";

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
                    {this.props.status==="1.1" ? <SelectApplicantSuccess data={item} title={"Pick this Candidate"}/> : <div/>}
                    {this.props.status==="1.2"?<JobDoneSuccess data={item} title={"Job Completed"}/> :<div/>}
                </ListItem>
                <Divider/>
            </div>
        )
    }
}

export default ContactItem