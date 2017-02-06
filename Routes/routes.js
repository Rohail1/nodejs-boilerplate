/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function (dependencies) {

  let router  = express.Router();


  function setup(dir) {
    let items = fs.readdirSync(dir);

    items.forEach(function (item) {
      let fullPath = path.join(dir, item),
        st = fs.statSync(fullPath);

      if (st.isDirectory()) {
        setup(fullPath);
      } else {
        if (/\.js$/i.test(item)) {
          require(fullPath).setupFunction(dependencies);
          registerAPI(require(fullPath).APIs);
        }
      }
    });
  }

  function registerAPI(module) {
    for(let prop in module){
      if(module.hasOwnProperty(prop)){
        registerMethod(module[prop].method,module[prop].prefix.concat(module[prop].route),module[prop].handler)
      }
    }
  }

  function registerMethod(method,route,handler) {

    switch (method){
      case 'GET' :
        router.get(route,handler);
        break;
      case 'POST' :
        router.post(route,handler);
        break;
      case 'PUT' :
        router.put(route,handler);
        break;
      case 'DELETE' :
        router.delete(route,handler);
        break;
      default :
        console.log('Unknow route ',method);
        break;
    }
  }

  setup(dependencies.config.rootPath+dependencies.config.API_DIR);
  dependencies.app.use(router);

};