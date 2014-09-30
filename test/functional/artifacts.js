InfiniteCrisis = require("../mocks/infinite-crisis-mocker.js");

describe("Artifacts Endpoint Functional Tests", function(){

  var api = {};

  beforeEach(function(){
    api = new InfiniteCrisisMock();
  });

  it("should get correct all artifacts data in english", function(done){
    api.getArtifactsV1({"shard":21}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.artifacts.length.should.equal(results.count);
      done();
    })
  });

  it("should get correct all artifacts data in german", function(done){
    api.getArtifactsV1({"shard":21, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.artifacts.length.should.equal(results.count);
      done();
    })
  });

  it("should get correct data for a specific endpoint in english", function(done){
    api.getArtifactV1({"shard":21, "artifactId":"1073742988"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.name.should.equal("Lobo's Chain");
      done();
    })
  });

  it("should get correct data for a specific endpoint in german", function(done){
    api.getArtifactV1({"shard":21, "artifactId":"1073742988", "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.name.should.equal("Lobos Kette");
      done();
    })
  });

});