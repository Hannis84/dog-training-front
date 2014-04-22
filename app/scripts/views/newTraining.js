'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'new-training',
  template: JST['new'],

  events: {
    'submit #new': 'save'
  },

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template());
    this.$trainingForm = this.$('#new');
    return this;
  },

  save: function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/trainings',
      data: this.$trainingForm.serialize(),
      success: function () {
        Backbone.history.navigate('', {trigger: true});
      }
    });
  }

});
