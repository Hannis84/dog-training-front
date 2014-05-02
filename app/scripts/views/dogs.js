'use strict';

var Dogs = require('../collections/dogs');
var DogView = require('./dog');
var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'dogs',
  template: JST['dogs'],

  events: {
    'click #dogs-add': 'new'
  },

  initialize: function () {
    this.listenTo(Dogs, 'add', this.addOne);

    Dogs.fetch();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  addOne: function (dog) {
    var view = new DogView({model: dog});
    this.$el.append(view.render().el);
  },

  new: function () {
    Backbone.history.navigate('/dogs/new', {trigger: true});
  }

});
