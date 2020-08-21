import React, { Component } from 'react';

const styles = {
    header_right: {
        width: "30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    header_left: {
        width: "70%",
        marginLeft: "20px",
        color: "blue"
    },
    header_wrapper: {
        display: "flex",
        borderBottom: "1px solid #ccc"
    }
}

class Header extends Component {

  render() {
    return (
     
        <div style={styles.header_wrapper}>
            <div style={styles.header_left}>
                <h1 >Banking Service</h1>
            </div>
            {this.props.isLoggedin && (<div style={styles.header_right}>
            <h4>{this.props.user.name}</h4>
            <h4 style={{cursor: "pointer"}} onClick={this.props.logout}>Logout</h4>
            </div>)}
        </div>
    );
  }
}

export default Header;
