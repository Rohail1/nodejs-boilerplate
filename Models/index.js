module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let User = require('./users')(Schema);

// Associating Models with Schemas

  models.User = mongoose.model('User', User);

  return models;

};
