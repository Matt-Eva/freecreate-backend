class ErrorHandler{
    constructor(){
        this.errors = []
    }

    checkErrors(){
        if (this.errors.length > 0){
            throw this.errors
        }
    }

    checkString(string, field){
        if (typeof string === 'string' && string.length !== 0){
            return string
        } else {
            this.errors.push(new Error(`${field} must be present.`))
        }
    }
}

module.exports = {
    ErrorHandler
}