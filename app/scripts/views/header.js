'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

var Common = require('../common');

module.exports = Backbone.View.extend({
  el: 'header',

  events: {
    'click #logo': 'index',
    'click #log-out': 'logout',
    'click #sessions-link': 'sessions',
    'click #dogs-link': 'dogs',
    'click #sign-in': 'login'
  },

  index: function () {
    Backbone.history.navigate('', {trigger: true});
  },

  login: function () {
    Backbone.history.navigate('/login', {trigger: true});
  },

  logout: function () {
    $.post('/api/logout', function () {
      Common.isLoggedIn = false;
      Backbone.history.navigate('/login', {trigger: true});
    });
  },

  sessions: function () {
    Backbone.history.navigate('/sessions', {trigger: true});
  },

  dogs: function () {
    Backbone.history.navigate('/dogs', {trigger: true});
  }

});
