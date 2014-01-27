'use strict';
var Backbone = require('backbone');
var noteModel = require('../models/noteModel');
Backbone.$ = window.$;

var Collection = Backbone.Collection.extend({
  model: noteModel,
  url: 'http://localhost:3000/notes',

  save: function(note) {
    this.add(note);
    save(note);
  }
});

module.exports = new Collection();