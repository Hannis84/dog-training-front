'use strict';
var Backbone = require('backbone');
Backbone.$ = window.$;

var WelcomeView = require('../views/welcome');
var LoginView = require('../views/login');
var TrainingsView = require('../views/trainings');
var TrainingView = require('../views/showTraining');
var TrainingFormView = require('../views/trainingForm');
var Training = require('../models/training');
var DogsView = require('../views/dogs');
var Dog = require('../models/dog');
var Dogs = require('../collections/dogs');
var DogFormView = require('../views/dogForm');
var ResultFormView = require('../views/resultForm');
var Result = require('../models/result');
var Common = require('../common');

module.exports = Backbone.Router.extend({

  routes: {
    '(/)': 'index',
    '(/)sessions': 'sessions',
    '(/)login(/)': 'showLogin',
    '(/)trainings/new': 'newTraining',
    '(/)trainings/:id(/)': 'showTraining',
    '(/)trainings/:id/edit': 'editTraining',
    '(/)trainings/:id/results': 'newResult',
    '(/)dogs(/)': 'dogs',
    '(/)dogs/new': 'newDog',
    '(/)dogs/:id/edit': 'editDog'
  },

  index: function () {
    if (Common.activeView) {
      Common.activeView.trigger('destroy');
    }

    if (Common.isLoggedIn) {
      this.showNavigation();
    } else {
      this.hideNavigation();
    }

    var view = new WelcomeView();
    Common.activeView = view;
    $('div[role="main"]').html(view.render().el);
  },

  sessions: function () {
    this.auth(function () {
      $('#log-out').removeClass('hidden');
      Dogs.fetch({success: function () {
        this.render(new TrainingsView({dogs: Dogs.models}));
      }.bind(this)});
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
      Dogs.fetch({success: function (dogs) {
        this.render(new TrainingFormView({model: new Training(), dogs: Dogs.models}));
      }.bind(this)});
    }.bind(this));
  },

  editTraining: function (id) {
    this.auth(function () {
      var self = this;
      var training = new Training({id: id});
      training.fetch({success: function (training) {
        Dogs.fetch({success: function (dogs) {
          self.render(new TrainingFormView({model: training, editing: true, dogs: Dogs.models}));
        }});
      }});
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

  newResult: function (trainingId) {
    this.auth(function () {
      this.render(new ResultFormView({model: new Result(), trainingId: trainingId}));
    }.bind(this));
  },

  auth: function (callback) {
    // See Global AjaxSetup for 401
    $.get('/api/authenticated', function () {
      Common.isLoggedIn = true;
      callback();
    });
  },

  render: function (view) {
    if (Common.activeView) {
      Common.activeView.trigger('destroy');
    }

    this.showNavigation();

    Common.activeView = view;
    var body = $('<div/>', {'class': 'wrapper'}).html(view.render().el);
    $('div[role="main"]').html(body);
  },

  showNavigation: function () {
    $('.main-header .dogs').removeClass('hidden');
    $('.main-header .sessions').removeClass('hidden');
    $('#log-out').removeClass('hidden');
    $('#sign-in').addClass('hidden');
  },

  hideNavigation: function () {
    $('.main-header .dogs').addClass('hidden');
    $('.main-header .sessions').addClass('hidden');
    $('#log-out').addClass('hidden');
    $('#sign-in').removeClass('hidden');
  },

  hide: function (elem) {
    if (!elem.hasClass('hidden')) elem.addClass('hidden');
  }
});
