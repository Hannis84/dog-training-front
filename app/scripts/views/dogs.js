'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'dogs',
  template: JST['dogs'],

  events: {
    
  },

  initialize: function () {
    
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
  
});