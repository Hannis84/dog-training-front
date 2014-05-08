'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'welcome',
  template: JST['welcome'],
  
  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }

});
