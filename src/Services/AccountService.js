import $ from 'jquery'
import APIService from './APIService'
import Cookies from 'js-cookie';

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
        }; // end of state change: it can be after some time (async)
        xhr.open("GET", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    CreateUserUpdateData(currentPassword, newUsername, newEmail, newPassword) {
        return ({
            currentPassword: currentPassword,
            newUsername: newUsername,
            newEmail: newEmail,
            newPassword: newPassword
        });
    }

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
        }; // end of state change: it can be after some time (async)
        xhr.open("PUT", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send(JSON.stringify({
            currentPassword: userUpdateData.currentPassword,
            newUsername: userUpdateData.newUsername,
            newEmail: userUpdateData.newEmail,
            newPassword: userUpdateData.newPassword
        }));
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
        }; // end of state change: it can be after some time (async)
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
        }; // end of state change: it can be after some time (async)
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };

    PreformLogin(username, password, onComplete) {
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
        }; // end of state change: it can be after some time (async)
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            username: username,
            password: password
        }));
    };

    PreformRegister(username, email, password, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Account";
        //alert(username + "|" + email + "|" + password + "|" + this.APIBaseUrl + "/Account");
        $.ajax({
            url: apiUrl,
            type: "POST",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            data: {
                username: username,
                email: email,
                password: password
            },
            contentType: "application/json",
            //contentType: "application/json; charset=utf-8",
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