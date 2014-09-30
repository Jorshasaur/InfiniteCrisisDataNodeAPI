InfiniteCrisisMock = require("../mocks/infinite-crisis-mocker.js");
config = require("../../config.json");

describe("Shards Endpoint Functional Tests", function(){

  var api = {};

  beforeEach(function(){
    api = new InfiniteCrisisMock();
  });

  it("should get correct all shards data in english", function(done){
    api.getShardsV1({"lang":"en"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.shards.length.should.equal(results.count);
      results._embedded.shards[0].alertMessage.should.equal("Hail Protectors! On Wednesday, July 30th, the European and Russian shards will be unavailable from 8:00 AM to 3:00 PM Eastern (-4 GMT) as we conduct maintenance. The North American server will remain up and online as this work is completed, but our website logins and referral will be unavailable.");
      done();
    })
  });

  it("should get correct all shards data in german", function(done){
    api.getShardsV1({"lang":"de"}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results._embedded.shards.length.should.equal(results.count);
      results._embedded.shards[0].alertMessage.should.equal("Seid gegrüßt, Protektoren! Am Mittwoch, den 30. Juli, werden die europäischen und russischen Game-Server von 14:00 bis 21:00 Uhr MESZ für Wartungsarbeiten nicht erreichbar sein. Auch der Login unserer Webseite und das Programm zur Spieleranwerbung sind davon betroffen.");
      done();
    })
  });

  it("should get correct single shard data in english", function(done){
    api.getShardV1({"lang":"en", "shardId":1}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.shardId.should.equal(1);
      done();
    })
  });

  it("should get correct single shard data in french", function(done){
    api.getShardV1({"lang":"fr", "shardId":21}, function(error, results){
      errorTest = (error === null);
      errorTest.should.equal(true);
      results.shardId.should.equal(21);
      results.alertMessage.should.equal("Salutations, Protecteurs ! Les serveurs européen et russe seront indisponibles le mercredi 30 juillet de 14 h à 21 h (heure française) pour cause de maintenance.");
      done();
    })
  });

});