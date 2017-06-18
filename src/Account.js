import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountManager from './Managers/AccountManager';
import AccountService, {UserUpdate} from './Services/AccountService';
import AuthenticationService, {UserLogin} from './Services/AuthenticationService';

class Account extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountManager = new AccountManager();
    this.accountService = new AccountService(this.apiCallCompleted, this.apiCallFailed);
    this.authenticationService = new AuthenticationService(this.apiCallAuthCompleted, this.apiCallAuthFailed);

    this.state = {
      authUser : this.accountManager.GetLoggedInUser(),
      user: {id:0, username:"", email:""},

      newUsername: "",
      newEmail: "",
      newPassword: "",
      verifyNewPassword: "",
      currentPassword: "",

      accountInfoChanging: false,
      accountDeleting: false,
      accountDeleted: false,
      success: "",
      error: ""
    };
  }

  componentDidMount() {
    // alert("Component Mounted");
    if (!this.accountManager.IsUserLoggedIn()) return;
    this.accountService.PreformGetAccount(this.state.authUser.id, this.state.authUser.authToken);
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

    // Create the UserUpdate
    var userUpdate = new UserUpdate(this.state.currentPassword, this.state.newUsername, this.state.newEmail, this.state.newPassword);
    if (this.state.newUsername === this.state.user.username)
      userUpdate.newUsername = "";
    if (this.state.newEmail === this.state.user.email)
      userUpdate.newEmail = "";
    if (this.state.newPassword.length <= 0 || this.state.verifyNewPassword.length <= 0 || this.state.newPassword != this.state.verifyNewPassword)
      userUpdate.newPassword = "";

    if (userUpdate.newUsername === "" && userUpdate.newEmail === "" && userUpdate.newPassword === "")
    {
      this.setState({error: "To update your account you must change something"});
      return;
    }

    // alert(JSON.stringify(userUpdate));
    this.setState({accountInfoChanging: true});
    this.accountService.PreformUpdateAccount(this.state.authUser.id, this.state.authUser.authToken, userUpdate);
  }

  handleDelete(event) {
    if (window.confirm("Are you sure you want to delete your account?... This action is PERMANENT")) {
      this.setState({accountDeleting: true});
      this.accountService.PreformDeleteAccount(this.state.authUser.id);
    }
  }

  apiCallCompleted(response) {
    // alert(response);
    if (this.state.accountInfoChanging) {
      this.state.user.email = this.state.newEmail;

      this.setState({
        authUser: response,     
        newUsername: response.username,
        newEmail: this.state.email, 
        newPassword: "",
        verifyNewPassword: "",
        currentPassword: "",
        accountInfoChanging: false,
        success: "Account successfully updated"
      });   

      this.accountManager.SetLoggedInUser(response, false);
    }
    else if (this.state.accountDeleting) {
      this.setState({accountDeleted: true});      
    }
    else {
      this.setState({ 
        user: response,
        newUsername: response.username,
        newEmail: response.email,
        newPassword: "",
        verifyNewPassword: "",
        currentPassword: "",
      });    
    }
  }
  apiCallFailed(response) {
    //alert(response);
    this.setState({error: response});
  }

  render() {
    if (!this.accountManager.IsUserLoggedIn())
      return(<Redirect to="/account/login"/>);
    if (this.state.accountDeleted) 
      return(<Redirect to="/account/logout"/>);

    return (
      <div className="container">
        <form className="form-account-update" onSubmit={this.handleSubmit}>
          <div className="row">
            <p className="col-2 col-form-label">ID</p>
            <div className="col-10">
              <p>{this.state.user.id}</p>
            </div>
          </div>
          <div className="row">
            <p className="col-2 col-form-label">Auth Token</p>
            <div className="col-10">
              <p>{this.state.authUser.authToken}</p>
            </div>
          </div>
          <div className="form-group row">
            <p className="text-success">{this.state.success}</p>
            <p className="text-danger">{this.state.error}</p>
          </div>
          <div className="form-group row">
            <label htmlFor="example-username-input" className="col-2 col-form-label">Username</label>
            <div className="col-10">
              <input className="form-control" type="text" value={this.state.newUsername} placeholder="Username" name="newUsername" id="example-username-input" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-email-input" className="col-2 col-form-label">Email</label>
            <div className="col-10">
              <input className="form-control" type="email" value={this.state.newEmail} placeholder="myEmail@example.com" name="newEmail" id="example-email-input" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-new-password-input" className="col-2 col-form-label">New Password</label>
            <div className="col-10">
              <input className="form-control" type="password" value={this.state.newPassword} placeholder="New password" name="newPassword" id="example-new-password-input" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="example-verify-new-password-input" className="col-2 col-form-label">Verify New Password</label>
            <div className="col-10">
              <input className="form-control" type="password" value={this.state.verifyNewPassword} placeholder="Verify New password" name="verifyNewPassword" id="example-verify-new-password-input" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row"></div>
          <div className="form-group row">
            <label htmlFor="example-current-password-input" className="col-2 col-form-label">Current Password</label>
            <div className="col-10">
              <input className="form-control" type="password" value={this.state.currentPassword} placeholder="Current Password" name="currentPassword" id="example-current-password-input" onChange={this.handleInputChange} required />
            </div>
          </div>
          <div className="form-group row">
            <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Account;
