'use strict';
window.$ = require('jquery');
window._ = require('lodash');
var Backbone = require('backbone');
var view = require('./views/notes');

$(function () {
  new view();
  console.log('started');
});