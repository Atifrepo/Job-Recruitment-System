import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import {NavLink} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserClock} from '@fortawesome/free-solid-svg-icons'
import Divider from '@material-ui/core/Divider';
import {parseCode} from "../../../status";

class JobItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    shouldComponentUpdate (nextProps, nextState) {
        return !this.state.data.equals(nextState.data);
    }

    render() {
        const item = this.props.data;
        let link = "/jobSummary/apply/" + item.applicant_id+'/'+item.task_id;
        return (
            <li className="comment-item" style={{'color': 'white'}}>
                <h3>
                    <i className="icon-user"></i>
                    <NavLink href={link}>{item.title} &nbsp;
                        {/*{item.status == '1' ? <FontAwesomeIcon icon={faUserClock}/> : ''} */}
                    </NavLink>
                </h3>
                <p style={{color: '#FFFFFF', paddingLeft: '40px'}}>Status:&nbsp;
                    {parseCode(item.status)}
                </p>
                <Divider/>
            </li>
        )
    }
}

export default JobItem