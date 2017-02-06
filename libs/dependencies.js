/**
 * Created by Rohail Najam on 2/5/2017.
 */

module.exports = function (app, express,config) {

  const mongoose = require('mongoose'),
    dbConnection  = require('./mongo')(config, mongoose),
    models  = require('../models/nosql/index')(mongoose)

  return {
    app : app,
    express : express,
    config : config,
    morgan :require('morgan'),
    bodyParser :require('body-parser'),
    cors : require('cors'),
    mongoose : mongoose,
    dbConnection : dbConnection,
    models : models
  }

};