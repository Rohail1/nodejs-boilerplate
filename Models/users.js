/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function(Schema){

  return new Schema({
    _id : {
      type : Schema.Types.ObjectId,
    },
    firstName : {
      type : String
    },
    lastName : {
      type : String
    }
  },{
    timeStamp : true
  });

};