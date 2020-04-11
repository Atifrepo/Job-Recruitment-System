import React from 'react'
import Item from './Item'
import './style.less'
import {Link} from "react-router-dom";
import PureRenderMixin from 'react-addons-pure-render-mixin'

class JobListPost extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data: this.props.data
        }

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }


    render() {
        const data = this.state.data
        return (
            <ul className="comment-list">{
                data.map((item, index) => {
                    return <Item key={index} data={item}/>;
                })
            }
            </ul>

        )
    }
}

export default JobListPost