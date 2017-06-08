import APIService from './APIService'

class TagService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }

    PreformGetAllTags() {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Tag";
        //alert(apiUrl);
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
        xhr.send();
    };
    PreformGetTag(id) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Tag/" + id;
        //alert(id + "|" + apiUrl);
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
        xhr.send();
    };
    PreformCreateTag(name, tagTypeID, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Tag";
        //alert(name + "|" + tagTypeID + "|" + authToken + "|" + apiUrl);
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
        xhr.send(JSON.stringify({
            name: name,
            tagTypeID: tagTypeID
        }));
    };
    PreformUpdateTag(id, name, tagTypeID, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Tag/" + id;
        //alert(id + "|" + name + "|" + tagTypeID + "|" + authToken + "|" + apiUrl);
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
        xhr.open("PUT", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send(JSON.stringify({
            id: id,
            name: name,
            tagTypeID: tagTypeID
        }));
    };
    PreformDeleteTag(id, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/Tag/" + id;
        //alert(id + "|" + authToken + "|" + apiUrl);
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
        xhr.open("DELETE", apiUrl, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };
};

export default TagService;