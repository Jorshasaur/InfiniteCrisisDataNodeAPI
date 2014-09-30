InfiniteCrisis = require("../../infinite-crisis");
_ = require("lodash");

var InfiniteCrisisMocker = function (){
  this.apiKey = "noKey";
  this.init();
}

InfiniteCrisisMocker.prototype.init = InfiniteCrisis.prototype.init;
InfiniteCrisisMocker.prototype.validate = InfiniteCrisis.prototype.validate;
InfiniteCrisisMocker.prototype.buildEndpoints = InfiniteCrisis.prototype.buildEndpoints;
InfiniteCrisisMocker.prototype.formatEndpoint = InfiniteCrisis.prototype.formatEndpoint;
InfiniteCrisisMocker.prototype.checkForRequired = InfiniteCrisis.prototype.checkForRequired;
InfiniteCrisisMocker.prototype.callEndpoint = InfiniteCrisis.prototype.callEndpoint;

InfiniteCrisisMocker.prototype.makeRequest = function(scope, props, callback){
  var cleanedEndpoint = scope.endpoint.replace(/\//g, "_");
  var params = [];
  for(p in props.qs){
    if(!_.contains(p, scope.endpointParams)){
      param = p + "_" + props.qs[p];
      params.push(param);
    }
  }
  params = "(" + params.join(",") + ")";
  var fileName = cleanedEndpoint + params + ".json";
  response = require("./" + fileName);
  callback(null, response);
}

module.exports = InfiniteCrisisMocker;