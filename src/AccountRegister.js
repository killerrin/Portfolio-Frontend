import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AccountManager from './Managers/AccountManager';
import AccountService, {UserCreate} from './Services/AccountService';
import Cookies from 'js-cookie';

import './AccountLoginRegister.css';

class AccountRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",

      error: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountManager = new AccountManager();
    this.accountService = new AccountService(this.apiCallCompleted, this.apiCallFailed);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.accountService.PreformCreateAccount(new UserCreate(this.state.username, this.state.email, this.state.password));
  }

  apiCallCompleted(response) {
    // alert(response);
    this.accountManager.SetLoggedInUser(response, false);
    this.forceUpdate();
  }
  apiCallFailed(response) {
    // alert(response);
    this.setState({error: response});
  }

  render() {
    if (this.accountManager.IsUserLoggedIn())
      return(<Redirect to="/account"/>)

    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">User Registration</h2>
          <p className="text-danger">{this.state.error}</p>

          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text" id="inputUsername" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} required />
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button> <Link to='/account/login'>Have an account?</Link>
        </form>
      </div>
    );
  }
}

export default AccountRegister;
