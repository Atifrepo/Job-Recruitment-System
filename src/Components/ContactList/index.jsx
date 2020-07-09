import React from 'react'
import List from '@material-ui/core/List';
import Item from './Item'
import './style.less'

class ContactList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const data = this.props.data;
        return (
            <div style={{'paddingLeft':'20px'}}>
                <h3 align={'left'} >Applied Candidate</h3>
                {(!data || data.length===0)?
                    <div>
                        <h5>Looking for Candidate, please check back later!</h5>
                    </div>
                    :
                    <List className="root">
                    {data.map((item) => {
                        return <Item data={item} status={this.props.status} enableChoice={true} />
                    })}

                </List>}

            </div>
        )
    }
}

export default ContactList