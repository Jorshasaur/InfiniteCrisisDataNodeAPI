Infinite Crisis Data API
===

This is a NodeJS client wrapper for the Infinite Crisis data API. If you are interested in contributing back to this project, feel free to read the Contributing documentation below.

If you're interested in seeing what we do with the service, please check out [our game information site](http://game.infinitecrisis.com/en/game/champions).

Usage
-----
Using the library requires only an API key:

```javascript
InfiniteCrisisAPI = require("infinite-crisis");
api = new InfiniteCrisisAPI("Your API Key Here");
champions = api.getChampionsV1({"shard":1});
```

###Obtaining an API Key
To obtain an API key, register for a [WBID account](https://account.infinitecrisis.com/en/registration) and then private message a forum administrator in our [forums](https://www.infinitecrisis.com/forums).

Installing Via NPM
------------------

To install the module using npm:

```
npm install infinite-crisis --save
```
