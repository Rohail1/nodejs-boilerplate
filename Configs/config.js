/**
 * Created by Rohail Najam on 2/5/2017.
 */

const path = require('path');
const rootPath = path.normalize(__dirname+"/../");


const configurations = {

  development : {
    port : 3000,
    rootPath : rootPath,
    db: {
      name : "db Name",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/dbName",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
    logStyle : 'dev',
    API_DIR : '/APIs',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth'
    }
  },

  production : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    logStyle : 'combined',
    db: {
      name : "db Name",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/dbName",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
    API_DIR : '/APIs',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth'
    }
  },

  testing : {
    port : process.env.PORT || 3000,
    rootPath : rootPath,
    logStyle : 'combined',
    API_DIR : '/APIs',
    API_PREFIX : {
      API : '/api',
      AUTH : '/auth'
    },
    db: {
      name : "db Name",
      mongo : {
        connectionString : process.env.MONGOPATH || "mongodb://localhost:27017/dbName",
        username : process.env.MONGOUSERNAME || '',
        password : process.env.MONGOPASSWORD || ''
      }
    },
  }
};


function returnConfiguration(env) {
  return configurations[env];
}

module.exports = returnConfiguration;