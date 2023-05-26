const {ModelValidator} = require("./model_validator.js")

class ShortStoryContent extends ModelValidator {
    constructor(data){
        const urlId = `${data.username}/${data.creatorName}/${data.title}`

        this.url_id = urlId
        this.content = data.content
        this.username = data.username
        this.user_id = data.userId
        this.thumbnail = data.thumbnail
        this.year = new Date().getFullYear
        this.creator_id = data.creator_id
        this.creator_name = data.creatorName
        this.title = data.title
        this.genre = data.genre
        this
    }
}

module.exports = {ShortStoryContent}