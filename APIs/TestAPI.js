

module.exports.setupFunction = function ({config,messages,models},helper,middlewares,validator) {

  const getUsers = (req,res) => {
    try {
      models.User.find({})
        .then(function (data) {
          return helper.sendResponse(res,messages.SUCCESSFUL,data)
        })
        .catch(function (error) {
        return helper.sendError(res,error)
      })
    }catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const postUser = async (req,res) => {
    try {
      let validated = await validator.validatePostUsers(req.inputs);
      if(validated.error)
        return helper.sendError(res,validated.error);
      let user = new models.User();
      user._id = helper.generateObjectId();
      user.firstName = req.inputs.firstName;
      user.lastName = req.inputs.lastName;
      await user.save();
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const updateUser = async (req,res) => {
    try {
      let validated = await validator.validateUpdateUsers(req.inputs);
      if(validated.error)
        return helper.sendError(res,validated.error);
      let user = await models.User.findOneAndUpdate({_id : helper.generateObjectId(req.inputs.userId)},
        {
          $set : {
            firstName : req.inputs.firstName
          }
        },{new : true});
      return helper.sendResponse(res,messages.SUCCESSFUL,user);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  };

  const deleteUser =  async (req,res) => {
    try {
      let validated = await validator.validateUpdateUsers(req.inputs);
      if(validated.error)
        return helper.sendError(res,validated.error);
      await models.User.remove({_id : helper.generateObjectId(req.inputs.userId)});
      return helper.sendResponse(res,messages.SUCCESSFUL);
    } catch (ex){
      return helper.sendError(res,ex)
    }
  };

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
      handler : postUser
    },
    updateUser : {
      route : '/users/:userId',
      method : 'PUT',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams], //FIFO order of middleware
      handler : updateUser
    },
    deleteUser : {
      route : '/users/:userId',
      method : 'DELETE',
      prefix : config.API_PREFIX.API,
      middlewares : [middlewares.getParams], //FIFO order of middleware
      handler : deleteUser
    }

  };

};