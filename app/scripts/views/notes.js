'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;
var noteCollection = require('../collections/noteCollection');
var Note = require('./note');

module.exports = Backbone.View.extend({
  el: $('#notes'),

  events: {
    
  },

  initialize: function () {
    console.log('fetched')
    this.listenTo(noteCollection, 'reset', this.addAll);
    noteCollection.fetch();
  },

  addAll: function () {
    console.log('addAll')
    this.$el.html('dfs');
    noteCollection.each(this.add, this);
  },
  
  add: function () {
    var view = new Note({model: note});
    this.$el.append(view.render().el);
  }
});