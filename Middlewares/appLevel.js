/**
 * Created by Rohail Najam on 2/8/2017.
 */


module.exports = function ({mongoose}) {

  // This middleware get all the inputs from params ,query ,body and place them in req.inputs
  function getInputs (req, res, next) {
    req.inputs = {};
    for(let prop in  req.body) {
      if(req.body.hasOwnProperty(prop))
        req.inputs[prop] = req.body[prop];
    }
    for(let prop in  req.query) {
      if(req.query.hasOwnProperty(prop))
        req.inputs[prop] = req.query[prop];
    }
    next();
  }

  function dummyAPPMiddleware (req, res, next) {
    next();
  }
  // Array Order of the middleware Matters so we follow FIFO
  return [
    getInputs,
    dummyAPPMiddleware
  ]

};