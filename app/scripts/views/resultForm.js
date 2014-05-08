'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'new-result',
  template: JST['resultForm'],

  events: {
    'click .positive-add': 'addPositive',
    'click .negative-add': 'addNegative',
    'submit #result-form': 'submit'
  },

  initialize: function (options) {
    this.training = options.trainingId;
    this.editing = options.editing ? true : false;
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    this.$form = this.$('#result-form');
    this.$positive = this.$('#positive-results');
    this.$negative = this.$('#negative-results');
    return this;
  },

  addPositive: function (e) {
    e.preventDefault();
    var input = $('<div>').append($('<input/>', {
      type: 'text',
      'class': 'form-control',
      name: 'positive'
    }));
    this.$positive.append(input);
  },

  addNegative: function (e) {
    e.preventDefault();
    var input = $('<div>').append($('<input/>', {
      type: 'text',
      'class': 'form-control',
      name: 'negative'
    }));
    this.$negative.append(input);
  },

  submit: function (e) {
    e.preventDefault();
    $.post('/api/trainings/' + this.training + '/results', this.$form.serialize(), function () {
      Backbone.history.navigate('/trainings/' + this.training, {trigger: true});
    }.bind(this));
  }

});
