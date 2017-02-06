

module.exports = function ({joi}) {

  let validators = {};

  validators.TestAPIs = require('./users')(Schema);

// Associating Models with Schemas

  models.User = mongoose.model('User', User);

  return models;

};