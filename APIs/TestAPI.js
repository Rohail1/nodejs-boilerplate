

module.exports.setupFunction = function ({config,messages,models,co},helper,middlewares,validator) {

  function getUsers(req,res) {

    try {
      models.User.find({})
        .then(function (data) {
          return helper.sendResponse(res,messages.SUCCESSFUL,data)
        }).catch(function (error) {
        return helper.sendError(res,error)
      })
    }catch (ex){
      return helper.sendError(res,ex)
    }
  }

  function* postUser(req,res) {
    try {
      let validated = yield validator.validatePostUsers(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let user = new models.User();
      user._id = helper.generateObjectId();
      user.firstName = req.inputs.firstName;
      user.lastName = req.inputs.lastName;
      yield user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  }

  function* updateUser(req,res) {
    try {
      let validated = yield validator.validateUpdateUsers(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      let user = yield models.User.findOne({_id : helper.generateObjectId(req.inputs.userId)});
      user.firstName = req.inputs.firstName;
      yield user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  }

  function* deleteUser(req,res) {
    try {
      let validated = yield validator.validateUpdateUsers(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);
      yield models.User.remove({_id : helper.generateObjectId(req.inputs.userId)});
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
    },
    updateUser : {
      route : '/users/:userId',
      method : 'PUT',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams], //FIFO order of middleware
      handler : co.wrap(updateUser)
    },
    deleteUser : {
      route : '/users/:userId',
      method : 'DELETE',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams], //FIFO order of middleware
      handler : co.wrap(deleteUser)
    }

  };

};