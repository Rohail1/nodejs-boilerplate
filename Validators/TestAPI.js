/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function ({joi}) {

  validatePostUsers = function (input) {
    let schema = joi.object().keys({
      firstName:joi.string().token().required().error(new Error('Please enter firstName')),
      lastName: joi.string().token().required().error(new Error('Please enter lastName'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  return  {
    validatePostUsers : validatePostUsers
  }

};