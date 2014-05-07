'use strict';

var Backbone = require('backbone');
var Common = require('../common');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({

  tagName: 'div',
  template: JST['training'],

  events: {
    'click .training-session': 'showTraining'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.visible);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  showTraining: function () {
    Backbone.history.navigate('/trainings/' + this.model.get('_id'), {trigger: true});
  },

  visible: function () {
    this.$el.toggleClass('hidden', this.isHidden());
  },

  isHidden: function () {
    return ((Common.dogFilter !==  'All' &&
            this.model.get('dog') !== Common.dogFilter) ||
            (Common.timeFilter !== 'All' &&
            this.compareTime())
           );
  },

  compareTime: function () {
    var date = this.model.get('date');
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    m = m < 10 ? '' + 0 + m : m;
    var d = now.getDate();
    d = d < 10 ? '' + 0 + d : d;
    var n = Number('' + y + m + d);
    date = Number(date.split('-').join(''));
    if (Common.timeFilter === 'Past') {
      return n < date;
    } else {
      return n > date;
    }
  }

});
