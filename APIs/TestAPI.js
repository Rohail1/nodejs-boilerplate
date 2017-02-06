

module.exports.setupFunction = function ({config,helper,messages,models},helper,middlewares,validator) {

  function getUsers(req,res) {

    models.User.find({})
      .then(function (data) {
        return helper.sendResponse(res,messages.SUCCESSFUL,data)
      }).catch(function (error) {
        return helper.sendError(res,error)
    })
  }

  function postUser(req,res) {
    try {
      let validated = validator.validatePostUsers(req.inputs);
      if(validated.error)
        throw new Error(validated.error.message);

    } catch (ex){
      return helper.sendError(res,error)
    }
  }

  module.exports.APIs = {

    getUsers : {
      route : '/users',
      method : 'GET',
      prefix : config.API_PREFIX.API,
      handler : getUsers
    },
    postUser : {
      route : '/users',
      method : 'POST',
      prefix : config.API_PREFIX.API,
      handler : postUser
    }

  };

};