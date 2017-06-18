import Cookies from 'js-cookie';

class AccountManager {
    constructor() { }

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

    SetLoggedInUser(user, rememberMe) {
        if (rememberMe) { // Set Expiry Date to a year away
            Cookies.set("user", user, { expires: 365 });
        }
        else { // Use default as it will clear on browser close
            Cookies.set("user", user);
        }

        var userCookie = Cookies.getJSON('user');
        return userCookie;
    };
    ClearLoggedInUser() {
        Cookies.remove('user');
    };
}

export default AccountManager;