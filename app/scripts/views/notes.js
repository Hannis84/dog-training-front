'use strict';
var Backbone = require('backbone');
var noteCollection = require('../collections/noteCollection');
var note = require('./note');

module.exports = function () {
  console.log('view')
  return Backbone.View.extend({
    el: $('#notes'),

    events: {
      
    },

    initialize: function () {
      this.listenTo(noteCollection, 'reset', this.addAll);
      noteCollection.fetch();
    },

    addAll: function () {
      console.log('addAll')
      this.$el.html('');
      noteCollection.each(this.add, this);
    },
    
    add: function () {
      var view = new note({model: note});
      this.$el.append(view.render().el);
    }
  });
}