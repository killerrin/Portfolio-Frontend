class APIService {
    constructor(onComplete, onFailed) {
        this.APIBaseUrl = "http://andrewgodfroyportfolioapi.azurewebsites.net/api";
        this.onComplete = onComplete;
        this.onFailed = onFailed;
    };
};

export default APIService;