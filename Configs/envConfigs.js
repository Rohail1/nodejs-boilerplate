/**
 * Created by Rohail on 5/23/2017.
 */

const configurations = {

  development : {
    envPath : 'envs/dev.env'
  },

  production : {
    envPath : 'envs/prod.env'
  },

  testing : {
    envPath : 'envs/stage.env'
  }
};


function returnEnvConfiguration(env) {
  return configurations[env].envPath;
}

module.exports = returnEnvConfiguration;