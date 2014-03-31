'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

var DogView = require('../views/dogs');
var LoginView = require('../views/login');
var TrainingView = require('../views/trainings');

module.exports = Backbone.Router.extend({

  routes: {
    '(/)': 'index',
    'login(/)': 'showLogin'
  },

  index: function () {
    this.auth(function () {
      $('#log-out').removeClass('hidden');
      var view = new TrainingView();
      $('div[role="main"]').html(view.render().el);
    }.bind(this));
  },

  showLogin: function () {
    this.hide($('#log-out'));
    var view = new LoginView();
    $('div[role="main"]').html(view.render().el);
  },

  auth: function (callback) {
    // See Global AjaxSetup for 401
    $.get('/api/authenticated', function () {
      callback();
    });
  },

  hide: function (elem) {
    if (!elem.hasClass('hidden')) elem.addClass('hidden');
  }
});
