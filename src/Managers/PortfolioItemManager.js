class PortfolioItemManager {
    constructor(allPortfolioItemsArr) {
        this.portfolioItems = allPortfolioItemsArr;
    }

    GetAll() {
        return this.portfolioItems;
    }

    GetByID(id) {
        for(i = 0; i < this.portfolioItems.length; i++) {
            if (this.portfolioItems[i].id == id) {
                return this.portfolioItems[i];
            }
        }
    }
    GetByTitle(title) {
        for(i = 0; i < this.portfolioItems.length; i++) {
            if (this.portfolioItems[i].title == title) {
                return this.portfolioItems[i];
            }
        }
    }
}

export default PortfolioItemManager;
