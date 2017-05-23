/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function ({joi}) {

  const validatePostUsers = (input) => {
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
  const validateUpdateUsers = (input) => {
    let schema = joi.object().keys({
      firstName:joi.string().token().required().error(new Error('Please enter firstName')),
      userId:joi.string().token().required().error(new Error('invalid UserId'))
    });
    try {
      return joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  return  {
    validatePostUsers,
    validateUpdateUsers,
  }

};