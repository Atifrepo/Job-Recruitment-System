
import React, {Component} from 'react';
import './Nav.css'

import {Button} from 'react-bootstrap';

class Nav extends Component {
    getLogout(props) {
        this.props.history.push('/Logout');

    }

    render() {
        return (
            <div className="nav_header">
                <Button bsStyle="primary" onClick={this.getLogout.bind(this)}>Logout</Button>
            </div>

        )
    }

}

export default Nav;
