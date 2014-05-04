'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.Model.extend({
  urlRoot: '/api/dogs',

  defaults: {
    name: '',
    fullname: '',
    breed: '',
    breeder: '',
    image: null,
    sports: []
  }
});
