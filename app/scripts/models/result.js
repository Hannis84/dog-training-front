'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.Model.extend({
  urlRoot: '/api/results',

  defaults: {
    goal: '',
    plus: [],
    minus: []
  }
});
