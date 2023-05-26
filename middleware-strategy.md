# Middleware Strategy

Have separate middleware functions for handling model creation and db querying.

Pass in specific models to be created or queries to be run by having the middleware functions return closures.

E.g. 
```
const myMiddleware = (callbackOrModel) =>{
    return (req, res, next){
        try{
            callbackorModel
        }catch(error){
            // handle error
            res.status(errorCode).send(error)
        }
    }
}
```

This will allow me to catch errors at different points in the request cycle, and will allow me to write error handling logic only once.

Issue: I need to run some queries as transactions. 

Best case would be to just write a separate error handling function that comes after my query.

Need a way to parse out the origin of the error - 422 model error, different types of database errors.

For the time being, just create schema validations in the Atlas GUI on MongoDB itself.