'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({

  tagName: 'div',
  template: JST['dog'],

  events: {
    'click .dog-edit': 'edit'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  edit: function () {
    Backbone.history.navigate('/dogs/' + this.model.get('_id') + '/edit', {trigger: true});
  }

});
