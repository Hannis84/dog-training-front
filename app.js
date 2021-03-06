'use strict';

var express = require('express');
var httpProxy = require('http-proxy');
var app = express();
var config = require('./config');

var proxy = new httpProxy.RoutingProxy();

function apiProxy() {
  return function (req, res, next) {
    if (req.url.match(new RegExp('^\/api\/'))) {
      req.url = req.url.replace('/api', '');
      proxy.proxyRequest(req, res, {
        host: 'dog-training-api.herokuapp.com',
        port: 80,
        changeOrigin: true
      });
    } else {
      next();
    }
  };
}

app.configure(function() {
  app.use(express.static(process.cwd() + '/dist'));
  app.use(apiProxy());
  app.use(express.bodyParser());
  app.use(express.errorHandler());
});

module.exports = app;

app.listen(config.port);
