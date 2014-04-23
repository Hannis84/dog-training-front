'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  el: 'header',

  events: {
    'click #log-out': 'logout',
    'click #sessions-link': 'sessions',
    'click #dogs-link': 'dogs'
  },

  logout: function () {
    $.post('/api/logout', function () {
      Backbone.history.navigate('/login', {trigger: true});
    });
  },

  sessions: function () {
    Backbone.history.navigate('/', {trigger: true});
  },

  dogs: function () {
    Backbone.history.navigate('/dogs', {trigger: true});
  }

});
