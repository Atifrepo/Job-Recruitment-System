import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { List, Avatar } from 'antd';
import 'antd/dist/antd.css';

class JobListAnt extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        // 获取数据
        //const data = this.props.data
        const data = [{
            jobName: "House Moving",
            id: "1",
            status: "In Progress",
            apply_date: "2020-03-04",
            description:'Please help with my house moving from Fenway to Malden'
        }, {
            jobName: "Chemistry Midterm review",
            id: "2",
            status: "Complete",
            apply_date: "2020-02-15",
            description:"Hi, there's a chemistry mid-term next week and may need some help."
        }];

        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href={`/jobSummary/+${item.id}`}>{item.jobName}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            // <div className="comment-list">
            //     {data.map((item, index) => {
            //         return <Item key={index} data={item}/>
            //     })}
            // </div>
        )
    }
}

export default JobListAnt