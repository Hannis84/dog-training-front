'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'new-result',
  template: JST['resultForm'],

  events: {

  },

  initialize: function (options) {
    this.editing = options.editing ? true : false;
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
