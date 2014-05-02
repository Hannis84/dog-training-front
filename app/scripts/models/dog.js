'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.Model.extend({
  defaults: {
    name: '',
    fullname: '',
    breed: '',
    breeder: '',
    sports: []
  }
});
