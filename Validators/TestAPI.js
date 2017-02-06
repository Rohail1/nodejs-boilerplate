/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function (co, joi) {

  validatePostUsers = function* (input) {
    let schema = joi.object().keys({
      firstName:joi.string().token().required(),
      lastName: joi.string().token().required()
    });
    try {
      return yield joi.validate(input,schema);
    }
    catch (ex){
      return ex;
    }
  };

  return  {
    validatePostUsers : co.wrap(validatePostUsers)
  }

};