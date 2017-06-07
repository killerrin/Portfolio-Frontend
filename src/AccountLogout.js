import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AccountService from './Services/AccountService';
import Cookies from 'js-cookie';

class AccountLogout extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    Cookies.remove('user');
    return(<Redirect to="/account/login"/>);     
  }
}

export default AccountLogout;
