import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
import {NavLink} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserClock} from '@fortawesome/free-solid-svg-icons'
import {Divider} from "antd";
class JobItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取数据
        const item = this.props.data;
        let link = "/jobSummary/"+ item.id;
        return (
            <li className="comment-item" style={{'color': 'white'}}>
                <h3>
                    <i className="icon-user"></i>
                    <NavLink href={link}>{item.jobName} &nbsp;{item.id==1?<FontAwesomeIcon icon={faUserClock}/>:''} </NavLink>
                </h3>
                <p style={{ color: '#FFFFFF', paddingLeft:'40px'}}>Status: {item.status}</p>
                <Divider orientation="left"> </Divider>
            </li>
        )
    }
}

export default JobItem