import APIService from './APIService'

class AccountService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }
    
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

    PreformCreateAccount(userRegisterData) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Account";
        //alert(username + "|" + email + "|" + password + "|" + this.APIBaseUrl + "/Account");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var parsedResponse = JSON.parse(this.responseText);
                //alert("Data Loaded: " + parsedResponse);
                if (self.onComplete !== null) {
                    self.onComplete(parsedResponse);
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
        xhr.send(JSON.stringify(userRegisterData));
    };
};

class UserCreate {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
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
export {UserCreate, UserUpdate };