class LinkTypeManager {
    constructor(allLinkTypesArr) {
        this.linkTypes = allLinkTypesArr;
    }

    GetAll() {
        return this.linkTypes;
    }

    GetByID(id) {
        for(i = 0; i < this.linkTypes.length; i++) {
            if (this.linkTypes[i].value == id) {
                return this.linkTypes[i];
            }
        }
    }
    GetByName(name) {
        for(i = 0; i < this.linkTypes.length; i++) {
            if (this.linkTypes[i].name == name) {
                return this.linkTypes[i];
            }
        }
    }
}

export default LinkTypeManager;
