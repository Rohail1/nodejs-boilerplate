/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function (dependencies,helper) {

  let router  = dependencies.express.Router();
  let middlewares = require('../Middlewares/index')(dependencies);
  
  

  function setup(dir) {
    let items = dependencies.fs.readdirSync(dir);

    items.forEach(function (item) {
      let fullPath = dependencies.path.join(dir, item),
        st = dependencies.fs.statSync(fullPath);

      if (st.isDirectory()) {
        setup(fullPath);
      } else {
        if (/\.js$/i.test(item)) {
          let validators = require(dependencies.config.rootPath+dependencies.path.join(dependencies.config.VALIDATOR_DIR,item))(dependencies);
          require(fullPath).setupFunction(dependencies,helper,middlewares.ROUTE,validators);
          registerAPI(require(fullPath).APIs);
        }
      }
    });
  }

  function registerAPI(module) {
    for(let prop in module){
      if(module.hasOwnProperty(prop)){
        registerMethod(
          module[prop].method,
          module[prop].prefix.concat(module[prop].route),
          module[prop].handler,
          module[prop].middlewares)
      }
    }
  }

  function registerMethod(method,route,handler,middlewares) {

    switch (method){
      case 'GET' :
        router.get(route,middlewares,handler);
        break;
      case 'POST' :
        router.post(route,middlewares,handler);
        break;
      case 'PUT' :
        router.put(route,middlewares,handler);
        break;
      case 'DELETE' :
        router.delete(route,middlewares,handler);
        break;
      default :
        console.log('Unknown method ',method);
        break;
    }
  }

  function registerAPPLevelMiddleware(middlewares) {
      dependencies.app.use(middlewares);
  }

  registerAPPLevelMiddleware(middlewares.APP);

  setup(dependencies.config.rootPath+dependencies.config.API_DIR);

  dependencies.app.use(router);

};