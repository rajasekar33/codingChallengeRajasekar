import React, { Component } from 'react';


import Login from './containers/userForm/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import Header from './components/UI/Header'

const alertStyle = {
    padding: "20px 10px",
    width: "50%",
    margin: "0 auto",
    border: "1px solid #ccc",
    marginTop: "20px",
    textAlign: "center",
    borderRadius: "10px",
    background: "#62c862",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600"
}

class App extends Component {

  state = {
    isLoggedin: false,
    user: null,
    alert: null
  }

  login = (event) => {
    console.log(event, "ssssssss")
    this.setState({isLoggedin: event['status'], user: event['user']})
  }

  logout = () => {
    this.setState({isLoggedin: false, user: null})
  }

  withdraw = (data) => {
    console.log(data)
    let currentUserState = {...this.state.user}
    currentUserState.account = currentUserState.account.map(acc => {
      if(acc.bank === data.bank){
        acc.balance = acc.balance - data.amount
      }
      return acc
    })
    this.setState({user: currentUserState, alert: `Please collect your cash ${data.amount}`})
    console.log(this.props)
    setTimeout(() => {
      this.setState({alert: null})
    }, 4000);
  }

  render() {
    return (
      <div>
        <Header {...this.state} logout={this.logout}/>
        {!this.state.isLoggedin && <Login login={(event) => this.login(event)}/>}
        {this.state.alert && <div style={alertStyle}>{this.state.alert}</div>}
        {this.state.isLoggedin && <Dashboard user={this.state.user} withdraw={(event) => this.withdraw(event)}/>}
      </div>
    );
  }
}

export default App;
