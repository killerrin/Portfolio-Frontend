import APIService from './APIService'

class AuthenticationService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }

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
};

class UserLogin {
    constructor(username, password) {
        this.username = username;
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

export default AuthenticationService;
export {UserLogin, UserAuth };