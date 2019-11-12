'use strict';

var BFFS = require('bffs');
var extend = require('extend');

module.exports = function (app, options, done) {
  app.bffs = new BFFS(extend({
    db: app.database,
    models: app.models,
    log: app.log.info
  }, app.config.get('bffs')));

  done();
};
