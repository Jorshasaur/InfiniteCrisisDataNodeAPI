InfiniteCrisisMock = require("../mocks/infinite-crisis-mocker.js");
config = require("../../config.json");

describe("Champions Endpoint Functional Tests", function(){

  var api = {};

  beforeEach(function(){
    api = new InfiniteCrisisMock();
  });

  it("should get correct all champions data in english", function(done){
    api.getChampionsV1({"shard":1}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.champions.length.should.equal(results.count);
      done();
    })
  });

  it("should get correct all champions data in german", function(done){
    api.getChampionsV1({"shard":1, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.champions.length.should.equal(results.count);
      done();
    })
  });

  it("should get correct data for a specific endpoint in english", function(done){
    api.getChampionV1({"shard":1, "championId":1073743302}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.characterName.should.equal("Aquaman");
      done();
    })
  });

  it("should get correct data for a specific endpoint in german", function(done){
    api.getChampionV1({"shard":1, "championId":1073743302, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.subtitle.should.equal("Herrscher von Atlantis");
      done();
    })
  });

});