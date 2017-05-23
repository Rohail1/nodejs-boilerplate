/**
 * Created by Rohail Najam on 2/5/2017.
 */

module.exports = function (app, express,config) {

  const mongoose = require('mongoose'),
    dbConnection  = require('../Configs/mongo')(config, mongoose),
    models  = require('../Models/index')(mongoose);

  return {
    app : app,
    express : express,
    config : config,
    morgan :require('morgan'),
    bodyParser :require('body-parser'),
    cors : require('cors'),
    mongoose : mongoose,
    fs : require('fs-extra'),
    dbConnection : dbConnection,
    models : models,
    messages : require('../Configs/messages'),
    path : require('path'),
    joi : require('joi')
  }

};