import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from '../JobList/Item'

import './style.less'

class JobListApply extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const data = [{
            jobName: "House Moving",
            id: "3",
            status: "In Progress",
            apply_date: "2020-03-04"
        }, {
            jobName: "Chemistry Midterm review",
            id: "4",
            status: "Complete",
            apply_date: "2020-02-15"
        }];

        return (
            <ul className="comment-list">
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}
            </ul>
        )
    }
}

export default JobListApply