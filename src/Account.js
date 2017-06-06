import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountService from './Services/AccountService';

class Account extends Component {
  constructor(props) {
    super(props);
    this.accountService = new AccountService();

    this.state = {
      authUser : this.accountService.GetLoggedInUser(),
      user: {id:0, username:"", email:""},

      error: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
  }

  componentDidMount() {
    // alert("Component Mounted");
    if (!this.accountService.IsUserLoggedIn()) return;
    this.accountService.PreformGetAccount(this.state.authUser.id, this.state.authUser.authToken, this.apiCallCompleted);
  }

  apiCallCompleted(response) {
    //alert(response);
    if (typeof response === 'string' || response instanceof String) { // Check for Errors
      this.setState({error: response});
    }
    else { // If no errors, it completed successfully
      this.setState({user: response});
    }
  }

  render() {
    if (!this.accountService.IsUserLoggedIn())
      return(<Redirect to="/account/login"/>);

    return (
      <div>
        <p>{this.state.authUser.id}</p>
        <p>{this.state.authUser.username}</p>
        <p>{this.state.user.email}</p>
        <p>{this.state.authUser.authToken}</p>
      </div>
    );
  }
}

export default Account;
