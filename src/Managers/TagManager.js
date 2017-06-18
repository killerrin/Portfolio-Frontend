class TagManager {
    constructor(allTagsArr, allTagTypesArr) {
        this.tags = allTagsArr;
        this.tagTypes = allTagTypesArr;
    }

    GetAllTags() {
        return this.tags;
    }
    GetTagByID(id) {
        for(i = 0; i < this.tags.length; i++) {
            if (this.tags[i].id == id) {
                return this.tags[i];
            }
        }
    }
    GetTagByName(name) {
        for(i = 0; i < this.tags.length; i++) {
            if (this.tags[i].name == name) {
                return this.tags[i];
            }
        }
    }

    GetAllTagTypes() {
        return this.tagTypes;
    }
    GetTagTypeByID(id) {
        for(i = 0; i < this.tagTypes.length; i++) {
            if (this.tagTypes[i].id == id) {
                return this.tagTypes[i];
            }
        }
    }
    GetTagTypeByName(name) {
        for(i = 0; i < this.tagTypes.length; i++) {
            if (this.tagTypes[i].name == name) {
                return this.tagTypes[i];
            }
        }
    }
}

export default TagManager;
