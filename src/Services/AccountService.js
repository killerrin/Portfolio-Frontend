import $ from 'jquery'
import APIService from './APIService'

class AccountService extends APIService {

    PreformLogin(username, password, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Authentication";
        //alert(username + "|" + password + "|" + apiUrl);
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: {
                username: username,
                password: password
            },
            contentType: "application/json; charset=utf-8",
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

    PreformRegister(username, email, password, onComplete) {
        var apiUrl = this.APIBaseUrl + "/Account";
        //alert(username + "|" + email + "|" + password + "|" + this.APIBaseUrl + "/Account");
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: {
                username: username,
                email: email,
                password: password
            },
            contentType: "application/json; charset=utf-8",
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