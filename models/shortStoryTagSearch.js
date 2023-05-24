const {ErrorHandler} = require("./error-handler.js")

class ShortStoryTagSearch extends ErrorHandler{

    constructor(data){
        this.errors = []
        this.title = this.checkString(data.title, "Title")
        this.created_at = Date.now()
        this.year = new Date().getFullYear()
        this.creator_name = this.checkString(data.creatorName, "Creator Name")
        this.creator_id
        this.thumbnail
        this.username = this.checkString(data.username)
        this.genre = this.checkString(data.genre, "Genre")
        this.tags = this.checkTags(data.tags)
        this.rank = 0
        this.rel_rank = 0
        this.flags = 0
        this.likes = 0
        this.lib_adds = 0
        this.donations = 0
        this.views = 0
        this.content_id = 
        this.checkErrors()
    }

    checkTags(tags){
        if (Array.isArray(tags)){
            return tags
        } else {
            return []
        }
    }

}

module.exports = {ShortStoryTagSearch}