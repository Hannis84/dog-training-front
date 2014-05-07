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
    'click .training-edit': 'edit'
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
  }

});
