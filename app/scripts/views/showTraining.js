'use strict';

var Backbone = require('backbone');
var Training = require('../models/training');
var TrainingView = require('./training');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'training',
  template: JST['showTraining'],

  initialize: function (options) {
    this.id = options.id;
  },

  render: function () {
    var self = this;
    var training = new Training({id: this.id});
    training.fetch({success: function () {
      self.$el.html(self.template(training.attributes));
    }});
    return this;
  }
});
