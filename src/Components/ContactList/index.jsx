import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item'
import Divider from '@material-ui/core/Divider';
import './style.less'

class ContactList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        //const data = this.props.data
        let data = [
            {
                userName: "Derek Apple",
                phone:"854-211-2345",
                email:"dereka@gamil.com"
            },
            {
                userName: "Jessica Banana",
                phone:"857-084-9842",
                email:"jessicab@gamil.com"
            }];
        return (
            <div >
            <h3 align={'left'}>&nbsp;&nbsp;Applied Candidate</h3>
            <List className="root">
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}

            </List>
            </div>
        )
    }
}

export default ContactList