import APIService from './APIService'

class SearchService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }

    CreateQueryString(searchTermArr) {
        var query = "?";
        for(var i = 0; i < searchTermArr.length; i++) {
            query += "searchTerms=" + encodeURIComponent(searchTermArr[i]) + "&";
        }
        return query;
    };

    PreformGetSearch(searchTermArr, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Search" + this.CreateQueryString(searchTermArr);

        //alert(searchTermArr + "|" + authToken + "|" + apiUrl);
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
        xhr.open("GET", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };
    PreformCreateTag(searchTermArr, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Search";
        //alert(searchTermArr + "|" + authToken + "|" + apiUrl);
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
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send(JSON.stringify(searchTermArr));
    };
};

export default SearchService;