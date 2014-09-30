InfiniteCrisisMock = require("../mocks/infinite-crisis-mocker.js");
config = require("../../config.json");

describe("Achievements Endpoint Functional Tests", function(){

  var api = {};

  beforeEach(function(){
    api = new InfiniteCrisisMock();
  });

  it("should get correct all achievements data in english", function(done){
    api.getAchievementsV1({"shard":1}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.achievements.length.should.equal(results.count);
      done();
    })
  });

  it("should get correct all achievements data in german", function(done){
    api.getAchievementsV1({"shard":1, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.achievements.length.should.equal(results.count);
      results._embedded.achievements[0].description.should.equal("Schließe die erste Einführungs-Mission ab.");
      done();
    })
  });

  it("should get correct data for a specific achievement in english", function(done){
    api.getAchievementV1({"shard":1, "achievementId":1073744648}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.name.should.equal("Complete Tutorial 1");
      done();
    })
  });

  it("should get correct data for a specific achievement in german", function(done){
    api.getAchievementV1({"shard":1, "achievementId":1073744648, "lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.name.should.equal("1. Einführungs-Mission");
      done();
    })
  });

});