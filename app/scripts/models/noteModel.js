'use strict';
var Backbone = require('backbone');

module.exports = function () {
	return Backbone.Model.extend({
    defaults: function() {
      return {
        note: 'Empty note'
      };
    },

    initialize: function(note) {
      this.set(note);
    }
  });
}