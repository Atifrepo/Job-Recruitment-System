import React, {Component} from 'react';
import LeftPanelCompany from '../LeftPanelCompany';

import Logout from '../logout';

class Company extends Component {
    constructor() {
        super();

    }
render() {
    return(
        <div>
       <LeftPanelCompany {...this.props} />
        <Logout {...this.props}/>
        
        </div>
    )
}
}
export default Company;