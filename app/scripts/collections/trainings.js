'use strict';
var Backbone = require('backbone');
var trainings = require('../models/trainings');
Backbone.$ = window.$;

var Collection = Backbone.Collection.extend({
  model: trainings,
  url: '/api/trainings'
});

module.exports = new Collection();
