'use strict';

var Backbone = require('backbone');
var Trainings = require('../collections/trainings');
var TrainingView = require('./training');
var Common = require('../common');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'trainings',
  template: JST['trainings'],

  events: {
    'click #training-add': 'new',
    'click .dog-filter .filter': 'filterByDog',
    'click .time-filter .filter': 'filterByTime'
  },

  initialize: function (options) {
    this.dogs = options.dogs;

    this.listenTo(Trainings, 'add', this.add);
  },

  render: function () {
    this.$el.html(this.template({dogs: this.dogs}));
    this.$training = this.$('.training-sessions');

    Trainings.fetch();

    return this;
  },

  add: function (training) {
    var trainingView = new TrainingView({model: training});
    this.$training.prepend(trainingView.render().el);
  },

  new: function () {
    Backbone.history.navigate('/trainings/new', {trigger: true});
  },

  filterOne: function (training) {
    training.trigger('visible');
  },

  filterByDog: function (e) {
    Common.dogFilter = $(e.target).text();

    $('.dog-filter .filter').removeClass('active');
    $(e.target).addClass('active');

    Trainings.forEach(this.filterOne, this);
  },

  filterByTime: function (e) {
    Common.timeFilter = $(e.target).text();

    $('.time-filter .filter').removeClass('active');
    $(e.target).addClass('active');

    Trainings.forEach(this.filterOne, this);
  },

});
