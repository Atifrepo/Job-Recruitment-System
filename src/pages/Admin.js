import React, {Component} from 'react';
import LeftPanelAdmin from '../LeftPanelAdmin';

import Logout from '../logout';
 

class Admin extends Component {
   render() {
       return(
           <div>
            <LeftPanelAdmin {...this.props} />
            <Logout {...this.props}/>
           </div>
       )
   } 
        
    }
    export default Admin;