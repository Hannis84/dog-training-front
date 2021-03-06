'use strict';

var Dogs = require('../collections/dogs');
var Backbone = require('backbone');
Backbone.$ = window;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'new-dog',
  template: JST['dogForm'],

  events: {
    'submit #new': 'save',
    'change .dog-image': 'preview'
  },

  initialize: function (options) {
    this.editing = options.editing ? true : false;
  },

  render: function () {
    this.$el.html(this.template({dog: this.model.attributes, editing: this.editing}));
    this.$form = this.$('#new');
    this.$fileSelect = this.$('.dog-image')[0];

    return this;
  },

  preview: function (e) {
    var input = e.target
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (event) {
        $('.placeholder').html($('<img>', {
          src: event.target.result
        }));
      }

      reader.readAsDataURL(input.files[0]);
    }
  },

  save: function (e) {
    e.preventDefault();
    var formData = new FormData();

    if (this.$fileSelect.files && this.$fileSelect.files[0]) {
      var file = this.$fileSelect.files[0];
      if (file.type.match('image.*')) {
        formData.append('image', file, file.name);
      }
    }

    this.$form.serializeArray().forEach(function (obj) {
      formData.append(obj.name, obj.value);
    });

    var xhr = new XMLHttpRequest();
    var isNew = this.model.get('_id');
    var method = isNew ? 'PUT' : 'POST';
    var url = '/api/dogs' + (isNew ? '/' + this.model.get('_id') : '');

    xhr.open(method, url, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        Backbone.history.navigate('/dogs', {trigger: true});
      } else {
        console.log('error');
      }
    };

    xhr.send(formData);
  }

});
