'use strict';

var Backbone = require('backbone');
var Training = require('../models/training');
var TrainingView = require('./training');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'training',
  template: JST['showTraining'],

  events: {
    'click .training-edit': 'edit',
    'click .training-remove': 'destroy',
    'click .results-add': 'add'
  },

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  edit: function () {
    Backbone.history.navigate('/trainings/' + this.model.get('_id') + '/edit', {trigger: true});
    return false;
  },

  destroy: function () {
    this.model.destroy();
    Backbone.history.navigate('/', {trigger: true});
  },

  add: function () {
    Backbone.history.navigate('/trainings/' + this.model.get('_id') + '/results', {trigger: true});
  }

});
