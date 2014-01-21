'use strict';
var Backbone = require('backbone');

module.exports = function () {
	return Backbone.View.extend({
    tagName: 'article',
    className: 'notes',
    template: JST['list'],

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
}