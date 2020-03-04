import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


import './style.less'

class CommentItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取数据
        const item = this.props.data

        return (
            <div className="comment-item">
                <h3>
                    <i className="icon-user"></i>
                    &nbsp;&nbsp;
                    {item.username}
                </h3>
                <p>{item.comment}</p>
            </div>
        )
    }
}

export default CommentItem