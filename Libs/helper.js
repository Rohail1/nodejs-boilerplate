/**
 * Created by Rohail Najam on 2/6/2017.
 */


module.exports=  function (mongoose) {


  let helpers = {

    copyObjects: function clone(a,propToExclude) {
      let obj = JSON.parse(JSON.stringify(a));
      if(propToExclude)
        for(let i =0;i<propToExclude.length;i++)
          delete obj[propToExclude[i]];
      return obj;
    },
    sendResponse : function (res, message,data) {
      let responseMessage = {
        success : message.success,
        message : message.message
      };
      if(data)
        responseMessage.data = data;
      return res.status(message.code).json(responseMessage);
    },
    sendError : function (res,error) {
      let responseMessage = {
        success : false,
        message : error.message
      };
      return res.status(500).json(responseMessage);
    },
    generateObjectId : function (id) {
      if(id){
        return mongoose.Types.ObjectId(id);
      }else {
        return mongoose.Types.ObjectId();
      }
    }
  };
  return helpers;
};