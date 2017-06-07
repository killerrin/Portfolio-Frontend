import $ from 'jquery'
import APIService from './APIService'
import Cookies from 'js-cookie';

class AccountService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }

    IsUserLoggedIn() {
        var user = this.GetLoggedInUser();
        if (user === undefined) {
            return false;
        }
        return true;
    };

    GetLoggedInUser() {
        var userCookie = Cookies.getJSON('user');
        return userCookie;
    };

    PreformGetAccount(id, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Account/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var user = JSON.parse(this.responseText);
                //alert("Data Loaded: " + user);
                if (self.onComplete !== null) {
                    self.onComplete(user);
                }    
            }
            else {
                if (self.onFailed !== null) {
                    self.onFailed(this.responseText);
                }
            }
        };
        xhr.open("GET", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformUpdateAccount(id, authToken, userUpdateData) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Account/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var user = JSON.parse(this.responseText);
                //alert("Data Loaded: " + user);
                if (self.onComplete !== null) {
                    self.onComplete(user);
                }    
            }
            else {
                if (self.onFailed !== null) {
                    self.onFailed(this.responseText);
                }
            }
        };
        xhr.open("PUT", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send(JSON.stringify(userUpdateData));
        //{
        //    currentPassword: userUpdateData.currentPassword,
        //    newUsername: userUpdateData.newUsername,
        //    newEmail: userUpdateData.newEmail,
        //    newPassword: userUpdateData.newPassword
        //}));
    };

    PreformDeleteAccount(id, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Account/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                if (self.onComplete !== null) {
                    self.onComplete(this.responseText);
                } 
            }
            else {
                if (self.onFailed !== null) {
                    self.onFailed(this.responseText);
                }
            }
        };
        xhr.open("DELETE", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformCheckAuthentication(id, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Authentication/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                if (self.onComplete !== null) {
                    self.onComplete(this.responseText);
                }
            }
            else {
                if (self.onFailed !== null) {
                    self.onFailed(this.responseText);
                }
            }
        };
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformLogin(userLoginData) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Authentication";
        //alert(username + "|" + password + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var authenticatedUser = JSON.parse(this.responseText);
                //alert("Data Loaded: " + authenticatedUser);
                if (self.onComplete !== null) {
                    self.onComplete(authenticatedUser);
                }    
            }
            else {
                if (self.onFailed !== null) {
                    self.onFailed(this.responseText);
                }
            }
        };
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(userLoginData));
    };

    PreformRegister(userRegisterData) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Account";
        //alert(username + "|" + email + "|" + password + "|" + this.APIBaseUrl + "/Account");
        $.ajax({
            url: apiUrl,
            type: "POST",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            data: userRegisterData, 
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                var authenticatedUser = JSON.parse(response);
                //alert("Data Loaded: " + authenticatedUser);
                if (self.onComplete !== null) {
                    self.onComplete(authenticatedUser);
                }                
            },
            error: function (xhr, status, error) {
                //alert(xhr.responseText);
                if (self.onFailed !== null) {
                    self.onFailed(xhr.responseText);
                }
            }
        });
    };
};

class UserLogin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    };
};
class UserCreate {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    };
};
class UserAuth {
        constructor(id, username, authToken) {
        this.id = id;
        this.username = username;
        this.authToken = authToken;
    };
};
class UserUpdate {
    constructor(currentPassword, newUsername, newEmail, newPassword) {
        this.currentPassword = currentPassword;
        this.newUsername = newUsername;
        this.newEmail = newEmail;
        this.newPassword = newPassword;
    };
};

export default AccountService;
export {UserLogin, UserCreate, UserAuth, UserUpdate };