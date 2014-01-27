'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.Model.extend({
    defaults: function() {
      {
        note: 'Empty note'
      }
    },

    initialize: function(note) {
      this.set(note);
    }
  });