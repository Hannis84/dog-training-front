'use strict';

var Dogs = require('../collections/dogs');
var Backbone = require('backbone');
Backbone.$ = window;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'new-dog',
  template: JST['newDog'],

  events: {
    'submit #new': 'save'
  },

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template());
    this.$form = this.$('#new');
    return this;
  },

  save: function (e) {
    e.preventDefault();
    //TODO convert to Dogs.create(dog, {success: function () {navvv}})
    $.ajax({
      type: 'post',
      url: '/api/dogs',
      data: this.$form.serialize(),
      success: function () {
        Backbone.history.navigate('/dogs', {trigger: true});
      }
    });
  }

});
