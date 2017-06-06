import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountService from './Services/AccountService';

class Account extends Component {
  constructor(props) {
    super(props);
    this.accountService = new AccountService();

    this.state = {
      user : this.accountService.GetLoggedInUser()
    };
  }

  render() {
    if (!this.accountService.IsUserLoggedIn())
      return(<Redirect to="/account/login"/>);

    return (
      <div>
        <p>{this.state.user.id}</p>
        <p>{this.state.user.username}</p>
        <p>{this.state.user.authToken}</p>
      </div>
    );
  }
}

export default Account;
