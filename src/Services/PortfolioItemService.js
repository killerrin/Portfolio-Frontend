import APIService from './APIService'

class PortfolioItemService extends APIService {
    constructor(onComplete, onFailed) {
        super(onComplete, onFailed);
    }

    PreformGetAllPortfolioItems(authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/PortfolioItem";
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
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };
    PreformGetPortfolioItem(id, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/PortfolioItem/" + id;
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
        xhr.setRequestHeader('Authorization', authToken);
        xhr.send();
    };
    PreformCreatePortfolioItem(authToken, updateData) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/PortfolioItem";
        //alert(name + "|" + authToken + "|" + apiUrl);
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
        xhr.send(JSON.stringify(updateData));
    };
    PreformUpdatePortfolioItem(id, authToken, updateData) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/PortfolioItem/" + id;
        //alert(id + "|" + name + "|" + authToken + "|" + apiUrl);
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
        xhr.send(JSON.stringify(updateData));
    };
    PreformDeletePortfolioItem(id, authToken) {
        var self = this;
        var apiUrl = this.APIBaseUrl + "/PortfolioItem/" + id;
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

class PortfolioItem {
    constructor(id, title, coverImageUrl, sourceCodeUrl, linksArr, published, awards, myRole, description, features, tagsArr, relatedItemsArr) {
        this.id = id;
        this.title = title;
        this.coverImageUrl = coverImageUrl;
        this.sourceCodeUrl = sourceCodeUrl;
        this.links = linksArr;
        this.published = published;
        this.awards = awards;
        this.myRole = myRole;
        this.description = description;
        this.features = features;
        this.tags = tagsArr;
        this.relatedItems = relatedItemsArr;
    };
};
class PortfolioItemLink {
    constructor(name, linkTypeID, url) {
        this.name = name;
        this.linkType = linkTypeID;
        this.url = url;
    };
};
class PortfolioItemTag {
    constructor(tagID) {
        this.tagID = tagID;
    };
};
class PortfolioItemRelatedItem {
    constructor(relatedItemID) {
        this.relatedItemID = relatedItemID;
    };
};


export default PortfolioItemService;
export {PortfolioItem, PortfolioItemLink, PortfolioItemTag, PortfolioItemRelatedItem };
