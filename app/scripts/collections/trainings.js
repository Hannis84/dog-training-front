'use strict';
var Backbone = require('backbone');
var trainings = require('../models/training');
Backbone.$ = window.$;

var Collection = Backbone.Collection.extend({
  model: trainings,
  url: '/api/trainings'
});

module.exports = new Collection();
