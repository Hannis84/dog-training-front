'use strict';
var Backbone = require('backbone');
var productModel = require('../models/trainings');
Backbone.$ = window.$;

var Collection = Backbone.Collection.extend({
  model: productModel,
  url: '/api/trainings',

  save: function(product) {
    this.add(product);
    this.save(product);
  }
});

module.exports = new Collection();
