import APIService from './APIService'

class LinkTypeService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }

    PreformGetAllLinkTypes() {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/LinkType";
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
    PreformGetLinkType(id) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/LinkType/" + id;
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
};

export default LinkTypeService;