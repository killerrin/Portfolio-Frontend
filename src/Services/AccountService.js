import $ from 'jquery'
import APIService from './APIService'
import Cookies from 'js-cookie';

class AccountService extends APIService {

    IsUserLoggedIn() {
        var user = this.GetLoggedInUser();
        if (user == undefined) {
            return false;
        }
        return true;
    };

    GetLoggedInUser() {
        var userCookie = Cookies.getJSON('user');
        return userCookie;
    };

    PreformLogin(username, password, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Authentication";
        //alert(username + "|" + password + "|" + apiUrl);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status == 200) {
                var authenticatedUser = JSON.parse(this.responseText);
                //alert("Data Loaded: " + authenticatedUser);
                if (onComplete != null) {
                    onComplete(authenticatedUser);
                }    
            }
            else {
                if (onComplete != null) {
                    onComplete(this.responseText);
                }
            }
        }; // end of state change: it can be after some time (async)
        xhr.onerror
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
                if (onComplete != null) {
                    onComplete(authenticatedUser);
                }                
            },
            error: function (xhr, status, error) {
                //alert(xhr.responseText);
                if (onComplete != null) {
                    onComplete(xhr.responseText);
                }
            }
        });
    };
};
export default AccountService;