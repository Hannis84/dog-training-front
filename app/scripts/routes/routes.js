'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

var LoginView = require('../views/login');
var TrainingView = require('../views/trainings');
var NewTrainingView = require('../views/newTraining');
var DogsView = require('../views/dogs');

module.exports = Backbone.Router.extend({

  routes: {
    '(/)': 'index',
    '(/)login(/)': 'showLogin',
    '(/)training/new': 'newTraining',
    '(/)dogs(/)': 'dogs'
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

  newTraining: function () {
    this.auth(function () {
      var view = new NewTrainingView();
      $('div[role="main"]').html(view.render().el);
    });
  },

  dogs: function () {
    this.auth(function () {
      var view = new DogsView();
      $('div[role="main"]').html(view.render().el);
    });
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
