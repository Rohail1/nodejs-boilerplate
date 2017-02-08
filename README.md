Node.js BoilerPlate
=======================
This project is basic boilerplate for a complete professional structure of a nodejs project.

How To Use
==================

###Libs
Libs folder contains some external libraries and some internal helper files. Currently there are two files in libs folders. Helper.js contains helper methods used throughout the app. The other file is dependencies.js this file contains all the dependencies and external modules all required in one single file so it can be passed to API files and used via destructuring to get required modules.

###Configs
Configs folder contains all the configuration for the project.

###Middlewares

Add your Route-level or App-level middlewares in the Middlewares directory in their respective files. 

    /Middlewares
      ->index.js
      ->appLevel.js
      ->routeLevel
     
Make your the order of your APP level middleware is correct as it follows First-In-First-Out Orders so the middleware placed first in the array will be used first in the app.</br>
As for Route level middlewares you can register them when you register the route.


###APIs
For writing APIs create a file in the APIs folder By following the structure of the TestAPI.js File And the routes and their middleware will automatically be registered to the Application. I have passed all the dependencies via object to  the APIs each of those can be accessible via destructuring the paramenters of the Setup function. Look into TestAPI.js file for furthor details </br>

      module.exports.APIs = {
    
        getUsers : {
          route : '/users',
          method : 'GET',
          prefix : config.API_PREFIX.API,
          middlewares : [middlewares.dummyRouteLevelMiddleware2],
          handler : getUsers
        },
        deleteUser : {
          route : '/users/:userId',
          method : 'DELETE',
          prefix : config.API_PREFIX.API,
          middlewares : [middlewares.getParams], //FIFO order of middleware
          handler : co.wrap(deleteUser)
        }
    
      };

###Validators
Name the validator file should be same as the API file for which the validators are being created and they will automatically be imported in the API file through parameters. I have used <a href=https://github.com/hapijs/joi/blob/master/API.md>Joi</a> for validation.Its great validation library.
 
###Models
Models folder contains mongoose models for your schemas.Add new model schemas and register/require them in Models/index.js for they can be loaded and exposed to entire app.
 
 