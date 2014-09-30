InfiniteCrisisMock = require("../mocks/infinite-crisis-mocker.js");
config = require("../../config.json");

describe("Stolen Powers Endpoint Functional Tests", function(){

  var api = {};

  beforeEach(function(){
    api = new InfiniteCrisisMock();
  });

  it("should get correct all stolen powers data in english", function(done){
    api.getStolenPowersV1({"shard":1}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.stolenpowers.length.should.equal(results.count);
      done();
    })
  });

  it("should get correct all stolen powers data in german", function(done){
    api.getStolenPowersV1({"shard":1, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.stolenpowers.length.should.equal(results.count);
      results._embedded.stolenpowers[0].name.should.equal("Aquaman: Superkraft");
      done();
    })
  });

  it("should get correct data for a specific stolen power in english", function(done){
    api.getStolenPowerV1({"shard":1, "stolenpowerId": 1207961875}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.name.should.equal("Aquaman's Super Strength");
      done();
    })
  });

  it("should get correct data for a specific stolen power in german", function(done){
    api.getStolenPowerV1({"shard":1, "stolenpowerId": 1207961875, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.name.should.equal("Aquaman: Superkraft");
      done();
    })
  });

});