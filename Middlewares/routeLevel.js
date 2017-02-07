/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({mongoose}) {

  function dummyRouteLevelMiddleware1(req, res, next) {
    console.log('Hello');
    next();
  }

  function dummyRouteLevelMiddleware2(req, res, next) {
    console.log('Hello2');
    next();
  }
  // Array Order of the middleware Matters so we follow FIFO
  return {
    dummyRouteLevelMiddleware1 : dummyRouteLevelMiddleware1,
    dummyRouteLevelMiddleware2 : dummyRouteLevelMiddleware2
  }

};