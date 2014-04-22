'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  el: 'header',

  events: {
    'click #log-out': 'logout'
  },

  logout: function () {
    $.post('/api/logout', function () {
      Backbone.history.navigate('/login', {trigger: true});
    });
  }

});
