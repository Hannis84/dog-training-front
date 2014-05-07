'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

var LoginView = require('../views/login');
var TrainingsView = require('../views/trainings');
var TrainingView = require('../views/showTraining');
var TrainingFormView = require('../views/trainingForm');
var Training = require('../models/training');
var DogsView = require('../views/dogs');
var Dog = require('../models/dog');
var DogFormView = require('../views/dogForm');
var Common = require('../common');

module.exports = Backbone.Router.extend({

  routes: {
    '(/)': 'index',
    '(/)login(/)': 'showLogin',
    '(/)trainings/new': 'newTraining',
    '(/)trainings/:id(/)': 'showTraining',
    '(/)trainings/:id/edit': 'editTraining',
    '(/)dogs(/)': 'dogs',
    '(/)dogs/new': 'newDog',
    '(/)dogs/:id/edit': 'editDog'
  },

  index: function () {
    this.auth(function () {
      $('#log-out').removeClass('hidden');
      this.render(new TrainingsView());
    }.bind(this));
  },

  showLogin: function () {
    this.hide($('#log-out'));
    this.render(new LoginView());
  },

  showTraining: function (id) {
    this.auth(function () {
      var training = new Training({id: id});
      training.fetch({success: function (training) {
        this.render(new TrainingView({model: training}));
      }.bind(this)});
    }.bind(this));
  },

  newTraining: function () {
    this.auth(function () {
      this.render(new TrainingFormView({model: new Training()}));
    }.bind(this));
  },

  editTraining: function (id) {
    this.auth(function () {
      var training = new Training({id: id});
      training.fetch({success: function (training) {
        this.render(new TrainingFormView({model: training, editing: true}));
      }.bind(this)});
    }.bind(this));
  },

  dogs: function () {
    this.auth(function () {
      this.render(new DogsView());
    }.bind(this));
  },

  newDog: function () {
    this.auth(function () {
      this.render(new DogFormView({model: new Dog()}));
    }.bind(this));
  },

  editDog: function (id) {
    this.auth(function () {
      var dog = new Dog({id: id});
      dog.fetch({success: function (dog) {
        this.render(new DogFormView({model: dog, editing: true}));
      }.bind(this)});
    }.bind(this));
  },

  auth: function (callback) {
    // See Global AjaxSetup for 401
    $.get('/api/authenticated', function () {
      callback();
    });
  },

  render: function (view) {
    if (Common.activeView) {
      Common.activeView.trigger('remove');
    }

    Common.activeView = view;

    $('div[role="main"]').html(view.render().el);
  },

  hide: function (elem) {
    if (!elem.hasClass('hidden')) elem.addClass('hidden');
  }
});
