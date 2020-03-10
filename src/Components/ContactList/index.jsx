import React from 'react'
import List from '@material-ui/core/List';
import Item from './Item'
import './style.less'

class ContactList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let data = [
            {
                userName: "Derek Apple",
                phone: "854-211-2345",
                email: "dereka@gamil.com"
            },
            {
                userName: "Jessica Banana",
                phone: "857-084-9842",
                email: "jessicab@gamil.com"
            }];
        return (
            <div>
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