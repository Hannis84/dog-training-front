'use strict';

var Backbone = require('backbone');
var Trainings = require('../collections/trainings');
var TrainingView = require('./training');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'trainings',
  template: JST['trainings'],

  events: {
    'click #training-add': 'new'
  },

  initialize: function () {
    this.listenTo(Trainings, 'add', this.add);
  },

  render: function () {
    this.$el.html(this.template());
    this.$training = this.$('.training-sessions');
    
    Trainings.fetch();

    return this;
  },

  add: function (training) {
    var trainingView = new TrainingView({model: training});
    this.$training.prepend(trainingView.render().el);
  },

  new: function () {
    Backbone.history.navigate('/training/new', {trigger: true});
  }

});
