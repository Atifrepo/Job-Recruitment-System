import React from 'react'


import Item from './Item'

import './style.less'

class JobList extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        // 获取数据
        //const data = this.props.data
        const data =
            [
                {   jobName: "Help with my cat",
                    id: "1",
                    status:"In Progress",
                },
                {   jobName: "Math homework",
                    id: "2",
                    status:"Complete"
                }
                ]

        return (
            <ul className="comment-list">
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}
            </ul>

        )
    }
}

export default JobList