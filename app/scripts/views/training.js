'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({

  tagName: 'div',
  template: JST['training'],

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
