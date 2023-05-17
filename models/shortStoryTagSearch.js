class ShortStoryTagSearch {

    constructor(data){
        this.errors = []
        this.title = data.title
        this.created_at = Date.now()
        this.year = new Date().getFullYear()
        this.tags = data.tags
        this.creator_name = data.creatorName
        this.genre = data.genre
        this.subgenre = data.subgenre
        this.tags = this.checkTags(data.tags)
    }

    checkTags(tags){
        if (Array.isArray(tags)){
            return tags
        } else {
            return []
        }
    }

    checkTitle(title){
        if (typeof title === 'string' && title.length !== 0){
            return title
        } else {
            this.errors.push(new Error('Title must be present.'))
        }
    }

}

export default ShortStoryTagSearch