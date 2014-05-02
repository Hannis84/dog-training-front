'use strict';
var Backbone = require('backbone');
var dog = require('../models/dog');
Backbone.$ = window.$;

var Collection = Backbone.Collection.extend({
  model: dog,
  url: '/api/dogs'
});

module.exports = new Collection();
