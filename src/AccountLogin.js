import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import AccountManager from './Managers/AccountManager';
import AccountService from './Services/AccountService';
import AuthenticationService, {UserLogin} from './Services/AuthenticationService';
import './AccountLoginRegister.css';

class AccountLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberMe: true,

      error: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountManager = new AccountManager();
    this.accountService = new AccountService(this.apiCallCompleted, this.apiCallFailed);
    this.authenticationService = new AuthenticationService(this.apiCallCompleted, this.apiCallFailed);
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
    this.authenticationService.PreformLogin(new UserLogin(this.state.username, this.state.password));
  }

  apiCallCompleted(response) {
    //alert(response);
    this.accountManager.SetLoggedInUser(response, this.state.rememberMe);
    this.forceUpdate();
  }
  apiCallFailed(response) {
    //alert(response);
    this.setState({error: response});
  }

  render() {
    if (this.accountManager.IsUserLoggedIn())
      return(<Redirect to="/account"/>)

    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <p className="text-danger">{this.state.error}</p>

          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text" id="inputUsername" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required />
          <div className="checkbox">
            <label>
              <input type="checkbox" name="rememberMe" defaultValue="remember-me" checked={this.state.rememberMe} onChange={this.handleInputChange}/> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button> <Link to='/account/register'>Or signup</Link>
        </form>
      </div>
    );
  }
}

export default AccountLogin;
