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
    'click #sign-in': 'login',
    'click #user-button': 'open',
    'click #profile-button': 'profile'
  },

  index: function () {
    Backbone.history.navigate('', {trigger: true});
  },

  login: function () {
    Backbone.history.navigate('/login', {trigger: true});
  },

  logout: function (e) {
    e.stopPropagation();
    this.hideNavigation();
    $.post('/api/logout', function () {
      Common.isLoggedIn = false;
      Backbone.history.navigate('/login', {trigger: true});
    });
  },

  sessions: function () {
    this.hideNavigation();
    Backbone.history.navigate('/sessions', {trigger: true});
  },

  dogs: function () {
    this.hideNavigation();
    Backbone.history.navigate('/dogs', {trigger: true});
  },

  open: function () {
    if (!$('#user-button').hasClass('happy')) {
      $('#user-button').addClass('happy');
      $('#more').removeClass('hidden');
    } else {
      $('#user-button').removeClass('happy');
      $('#more').addClass('hidden');
    }
  },

  profile: function (e) {
    e.stopPropagation();
    this.hideNavigation();
    Backbone.history.navigate('/profile', {trigger: true});
  },

  hideNavigation: function () {
    if (!$('#more').hasClass('hidden')) $('#more').addClass('hidden');
    $('#user-button').removeClass('happy');
  }

});
