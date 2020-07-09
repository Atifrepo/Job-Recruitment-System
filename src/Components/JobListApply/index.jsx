import React from 'react'

import Item from './Item'

import './style.less'

class JobListApply extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const data = this.props.data;
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