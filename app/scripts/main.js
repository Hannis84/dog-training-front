'use strict';
window.$ = require('jquery');
window._ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = window.$;

var View = require('./views/notes');
var Model = require('./models/noteModel');

$(function () {
  new View();
});