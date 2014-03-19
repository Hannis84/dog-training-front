'use strict';

var Backbone = require('backbone');
Backbone.$ = window.$;

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'login',
  template: JST['login'],

  events: {
    'submit #login-form': 'login',
    'submit #signup-form': 'signup'
  },

  initialize: function () {
    
  },

  render: function () {
    this.$el.html(this.template());
    this.$loginForm = this.$('#login-form');
    this.$signupForm = this.$('#signup-form');
    return this;
  },

  login: function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: this.$loginForm.serialize(),
      success: function (data, status) {
        Backbone.history.navigate('', {trigger: true});
      },
      error: function (data, status, err) {
        console.log(data.status);
      }
    });
  },

  signup: function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/signup',
      data: this.$signupForm.serialize(),
      success: function (data, status) {
        Backbone.history.navigate('', {trigger: true});
      },
      error: function (data, status, err) {
        if (data.status === 409) {
          console.log('email in use');
        }
      }
    });
  }
  
});