config = require("./config.json");
request = require("request");

var InfiniteCrisis = function(apiKey, configOverride){
  this.apiKey = apiKey;
  if(typeof(configOverride) !== "undefined") config = configOverride
  this.init();
};

InfiniteCrisis.prototype.init = function(){
  this.validate();
  this.buildEndpoints();
};

InfiniteCrisis.prototype.validate = function(){
  if(typeof(this.apiKey) === "undefined"){
    throw new Error("Api Key is required!");
  }
}

InfiniteCrisis.prototype.buildEndpoints = function(){
  var topScope = this;
  for(index in config.endpoints){
    endpoint = config.endpoints[index];
    methodName = Object.keys(endpoint)[0];
    method = endpoint[methodName];
    (function(methodName, method){
      topScope[methodName] = function(opts, callback){
        if(typeof(opts) === "undefined") opts = {};
        scope = topScope[methodName];
        opts.endpoint = method.url;
        scope.apiKey = this.apiKey;
        scope.endpointParams = method.url.match(/\/:([^/]+)/g);
        scope.params = method.params;
        scope.url = config.regions["na"];
        if(topScope.checkForRequired(scope, opts)){
          topScope.formatEndpoint(scope, opts);
          topScope.callEndpoint(scope, opts, callback);
        }
      }
    })(methodName, method);
  }
}

InfiniteCrisis.prototype.formatEndpoint = function(scope, opts){
  for(param in scope.endpointParams){
    value = scope.endpointParams[param];
    opts.endpoint = opts.endpoint.replace(":" + value, opts[value]);
  }
}

InfiniteCrisis.prototype.checkForRequired = function(scope, opts){
  for(parm in scope.endpointParams){
    param = scope.endpointParams[parm].replace("/:", "");
    scope.endpointParams[parm] = param;
    found = false;
    for(opt in opts){
      if(opt === param){
        found = true;
      }
    }
    if(!found){
      throw new Error(param + " is required.");
      return false;
    }
  }
  for(m in scope.params){
    type = scope.params[m].type;
    required = scope.params[m].required;
    if(required === "true"){
      if(typeof(opts) === "undefined" || typeof(opts[type]) === "undefined"){
        throw new Error(type + " is a required parameter.");
        return false;
      }
    }
  }
  return true;
}

InfiniteCrisis.prototype.callEndpoint = function(scope, opts, callback){
  if(typeof(opts) !== "undefined"){
    if(typeof(opts.region) !== "undefined"){
      for(index in config.regions){
        if(index === opts.region.toLowerCase()){
          scope.url = config.regions[index];
        }
      }
    }
  }
  scope.url = scope.url + opts.endpoint;
  scope.endpoint = opts.endpoint;
  delete opts.endpoint;
  delete opts.region;
  var props = {}
  props.headers = {"Authorization": "Bearer " + this.apiKey}
  props.qs = opts;
  this.makeRequest(scope, props, callback);
}

InfiniteCrisis.prototype.makeRequest = function(scope, props, callback){
  request.get(scope.url, props, function(err, response, body){
    res = JSON.parse(body);
    if(res.message){
      err = res.message
    }
    if(callback) callback(err, res);
  });
}

module.exports = InfiniteCrisis;