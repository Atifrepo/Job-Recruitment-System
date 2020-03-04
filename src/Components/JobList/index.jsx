import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

import './style.less'

class JobList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        // 获取数据
        //const data = this.props.data
        const data =
            [
                {   jobName: "help with my cat",
                    id: "1",
                    status:"In Progress"
                },
                {   jobName: "Math homework",
                    id: "2",
                    status:"Complete"
                }
                ]

        return (
            <div className="comment-list">
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}
            </div>
        )
    }
}

export default JobList