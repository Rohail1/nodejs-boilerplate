/**
 * Created by Rohail Najam on 2/6/2017.
 */


// All the Error messages will be placesd here along with there status code

module.exports = {

  AUTHENTICATION_FAILED:{
    code: 400,
    message :'Authentication failed. Wrong credentials.',
    success: false
  },
  SUCCESSFUL_LOGIN: {
    code: 200,
    message :'Successfully log in!',
    success: true
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal server error",
    success: false
  },
  SUCCESSFUL_DELETE: {
    code: 200,
    message:"Successfully deleted",
    success: true
  },
  SUCCESSFUL_UPDATE: {
    code:200,
    message:"successfully updated",
    success: true
  },
  SUCCESSFUL: {
    code:200,
    success: true,
    message : 'successful'
  },
  FORBIDDEN: {
    code: 403,
    message: "you are not authorized to complete this action.",
    success : false
  },
  BAD_REQUEST:{
    code:400,
    message : 'request invalid.',
    success: false
  },
  IN_COMPLETE_REQUEST:{
    code:422,
    message : 'Required parameters missing.',
    success: false
  },

};