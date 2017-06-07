import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountService from './Services/AccountService';

class Account extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountService = new AccountService(this.apiCallCompleted, this.apiCallFailed);

    this.state = {
      authUser : this.accountService.GetLoggedInUser(),
      user: {id:0, username:"", email:""},

      error: ""
    };
  }

  componentDidMount() {
    // alert("Component Mounted");
    if (!this.accountService.IsUserLoggedIn()) return;
    this.accountService.PreformGetAccount(this.state.authUser.id, this.state.authUser.authToken);
  }

  apiCallCompleted(response) {
    //alert(response);
    this.setState({user: response});
  }
  apiCallFailed(response) {
    //alert(response);
    this.setState({error: response});
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
