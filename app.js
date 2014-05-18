'use strict';

var express = require('express');
var httpProxy = require('http-proxy');
var app = express();
var config = require('./config');

var proxy = httpProxy.createProxyServer({});

function apiProxy() {
  return function (req, res, next) {
    if (req.url.match(new RegExp('^\/api\/'))) {
      req.url = req.url.replace('/api', '');
      proxy.web(req, res, {
        target: 'http://127.0.0.1:3000',
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
