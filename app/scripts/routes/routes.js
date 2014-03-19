'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

var DogView = require('../views/dogs');
var LoginView = require('../views/login');

module.exports = Backbone.Router.extend({

  routes: {
    '(/)': 'index',
    'login(/)': 'showLogin'
  },

  index: function () {
    this.auth(function () {
      var view = new DogView();
      $('div[role="main"]').html(view.render().el);
    }.bind(this));
  },

  showLogin: function () {
    var view = new LoginView();
    $('div[role="main"]').html(view.render().el);
  },

  auth: function (callback) {
    // See Global AjaxSetup for 401
    $.get('/api/authenticated', function () {
      callback();
    });
  }
});