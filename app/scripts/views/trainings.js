'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'trainings',
  template: JST['trainings'],

  events: {
    
  },

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }

});
