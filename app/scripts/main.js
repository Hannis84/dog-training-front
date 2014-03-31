'use strict';
window.$ = require('jquery');
window._ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = window.$;

var Router = require('./routes/routes');
var Header = require('./views/header');

$(function () {
  $(document).ajaxError(function (e, xhr) {
    if (xhr.status == 401) Backbone.history.navigate('login', {trigger: true});
  });
  new Router();
  new Header();
  Backbone.history.start();
});
