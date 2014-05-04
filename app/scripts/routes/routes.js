'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

var LoginView = require('../views/login');
var TrainingsView = require('../views/trainings');
var TrainingView = require('../views/showTraining');
var NewTrainingView = require('../views/newTraining');
var DogsView = require('../views/dogs');
var Dog = require('../models/dog');
var DogFormView = require('../views/dogForm');

module.exports = Backbone.Router.extend({

  routes: {
    '(/)': 'index',
    '(/)login(/)': 'showLogin',
    '(/)training/:id(/)': 'showTraining',
    '(/)training/new': 'newTraining',
    '(/)dogs(/)': 'dogs',
    '(/)dogs/new': 'newDog',
    '(/)dogs/:id/edit': 'editDog'
  },

  index: function () {
    this.auth(function () {
      $('#log-out').removeClass('hidden');
      var view = new TrainingsView();
      $('div[role="main"]').html(view.render().el);
    });
  },

  showLogin: function () {
    this.hide($('#log-out'));
    var view = new LoginView();
    $('div[role="main"]').html(view.render().el);
  },

  showTraining: function (id) {
    this.auth(function () {
      var view = new TrainingView({id: id});
      $('div[role="main"]').html(view.render().el);
    });
  },

  newTraining: function () {
    this.auth(function () {
      var view = new NewTrainingView();
      $('div[role="main"]').html(view.render().el);
    });
  },

  dogs: function () {
    this.auth(function () {
      var view = new DogsView();
      $('div[role="main"]').html(view.render().el);
    });
  },

  newDog: function () {
    this.auth(function () {
      var view = new DogFormView({model: new Dog()});
      $('div[role="main"]').html(view.render().el);
    });
  },

  editDog: function (id) {
    var dog = new Dog({id: id});
    dog.fetch({success: function (dog) {
      var view = new DogFormView({model: dog});
      $('div[role="main"]').html(view.render().el);
    }});
  },

  auth: function (callback) {
    // See Global AjaxSetup for 401
    $.get('/api/authenticated', function () {
      callback();
    });
  },

  hide: function (elem) {
    if (!elem.hasClass('hidden')) elem.addClass('hidden');
  }
});
