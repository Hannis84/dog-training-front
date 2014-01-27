'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'notes',
  template: JST['list'],

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});