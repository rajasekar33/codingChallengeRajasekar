import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Link,
  Route
} from 'react-router-dom'

import Bank from '../../components/Bank'


class Dashboard extends Component {


  render() {
    return (
      <Router>
        <div>
         
            <div style={{margin: "20px"}}><Link to="/bank" 
            style={{textDecoration: "none", padding: "10px", border: "1px solid #ccc", borderRadius: "5px"}}>Cash Withdrawal</Link></div>
        
          
          <Route path="/bank" render={(props) => <Bank {...props} withdraw={this.props.withdraw} user={this.props.user}/>}  />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
