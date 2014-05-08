'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'new-training',
  template: JST['trainingForm'],

  events: {
    'submit #new': 'save',
    'change .cover': 'preview'
  },

  initialize: function (options) {
    this.editing = options.editing ? true : false;
    this.dogs = options.dogs || [];
  },

  render: function () {
    this.$el.html(this.template({training: this.model.attributes, editing: this.editing, dogs: this.dogs}));
    this.$trainingForm = this.$('#new');
    this.$fileSelect = this.$('.cover')[0];
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

    this.$trainingForm.serializeArray().forEach(function (obj) {
      formData.append(obj.name, obj.value);
    });

    var xhr = new XMLHttpRequest();
    var isNew = this.model.get('_id');
    var method = isNew ? 'PUT' : 'POST';
    var url = '/api/trainings' + (isNew ? '/' + this.model.get('_id') : '');

    xhr.open(method, url, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        var url = this.editing ? '/trainings/' + this.model.get('_id') : '/sessions';
        Backbone.history.navigate(url, {trigger: true});
      } else {
        console.log('error');
      }
    }.bind(this);

    xhr.send(formData);
  }

});
