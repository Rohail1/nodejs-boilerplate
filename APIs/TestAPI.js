

module.exports.setupFunction = function ({config,messages,models,co},helper,middlewares,validator) {

  function getUsers(req,res) {

    models.User.find({})
      .then(function (data) {
        return helper.sendResponse(res,messages.SUCCESSFUL,data)
      }).catch(function (error) {
      return helper.sendError(res,error)
    })
  }

  function* postUser(req,res) {
    try {
      let validated = yield validator.validatePostUsers(req.body);
      if(validated.error)
        throw new Error(validated.error.message);
      let user = new models.User();
      user._id = helper.generateObjectId();
      return helper.sendResponse(res,messages.SUCCESSFUL);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  }

  module.exports.APIs = {

    getUsers : {
      route : '/users',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.dummyRouteLevelMiddleware2],
      handler : getUsers
    },
    postUser : {
      route : '/users',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.dummyRouteLevelMiddleware2,middlewares.dummyRouteLevelMiddleware1], //FIFO order of middleware
      handler : co.wrap(postUser)
    }

  };

};