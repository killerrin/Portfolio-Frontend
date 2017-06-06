import $ from 'jquery'
import APIService from './APIService'
import Cookies from 'js-cookie';

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

class AccountService extends APIService {
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

    PreformGetAccount(id, authToken, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Account/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var user = JSON.parse(this.responseText);
                //alert("Data Loaded: " + user);
                if (onComplete !== null) {
                    onComplete(user);
                }    
            }
            else {
                if (onComplete !== null) {
                    onComplete(this.responseText);
                }
            }
        };
        xhr.open("GET", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformUpdateAccount(id, authToken, userUpdateData, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Account/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var user = JSON.parse(this.responseText);
                //alert("Data Loaded: " + user);
                if (onComplete !== null) {
                    onComplete(user);
                }    
            }
            else {
                if (onComplete !== null) {
                    onComplete(this.responseText);
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

    PreformDeleteAccount(id, authToken, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Account/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                if (onComplete !== null) {
                    onComplete(this.responseText);
                } 
            }
        };
        xhr.open("DELETE", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformCheckAuthentication(id, authToken, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Authentication/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (onComplete !== null) {
                onComplete(this.responseText);
            } 
        };
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformLogin(userLoginData, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Authentication";
        //alert(username + "|" + password + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var authenticatedUser = JSON.parse(this.responseText);
                //alert("Data Loaded: " + authenticatedUser);
                if (onComplete !== null) {
                    onComplete(authenticatedUser);
                }    
            }
            else {
                if (onComplete !== null) {
                    onComplete(this.responseText);
                }
            }
        };
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(userLoginData));
    };

    PreformRegister(userRegisterData, onComplete) {
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
                if (onComplete !== null) {
                    onComplete(authenticatedUser);
                }                
            },
            error: function (xhr, status, error) {
                //alert(xhr.responseText);
                if (onComplete !== null) {
                    onComplete(xhr.responseText);
                }
            }
        });
    };
};
export default AccountService;
export {UserLogin, UserCreate, UserAuth, UserUpdate };