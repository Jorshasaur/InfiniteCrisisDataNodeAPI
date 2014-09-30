InfiniteCrisis = require("../../infinite-crisis");
InfiniteCrisisMock = require("../mocks/infinite-crisis-mocker");
config = require("../../config.json");

describe("Infinite Crisis Unit Tests", function(){

  var api = {};

  beforeEach(function(){
    api = new InfiniteCrisis("nokey");
  });

  it("should create a method called getChampionsV1", function(){
    functionCheck = typeof(api.getChampionsV1) === "function"
    functionCheck.should.equal(true);
  });

  it("should create a method called getChampionsV1", function(){
    functionCheck = typeof(api.getChampionsV1) === "function"
    functionCheck.should.equal(true);
  });

  it("should require shard with getChampionsV1", function(){
    (function(){
      api.getChampionsV1();
    }).should.throw("shard is a required parameter.");
  });

  it("should not require lang with getChampionsV1", function(){
    (function(){
      api.getChampionsV1({"shard":21});
    }).should.not.throw("shard is a required parameter.");
  });

  it("should set the right url with no region", function(done){
    api = new InfiniteCrisisMock();
    api.getChampionsV1({"shard":1}, function(err, res){
      hasUrl = api.getChampionsV1.url.indexOf(config.regions.na) > -1;
      hasUrl.should.equal(true);
      done();
    });
  });

  it("should set the right url with EU region", function(done){
    api = new InfiniteCrisisMock();
    api.getChampionsV1({"shard":1, "region":"eu"}, function(err, res){
      hasUrl = api.getChampionsV1.url.indexOf(config.regions.eu) > -1;
      hasUrl.should.equal(true);
      done();
    });
  });

  it("should validate specific endpoints", function(){
      (function(){
        api.getChampionV1({"shard":21}, function(err, res){
        });
      }).should.throw("championId is required.");
  });

});