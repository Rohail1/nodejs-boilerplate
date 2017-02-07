/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function (dependencies) {

  let middlewares = {};

  middlewares.APP = require('./appLevel')(dependencies);
  middlewares.ROUTE = require('./routeLevel')(dependencies);

  return middlewares;

};