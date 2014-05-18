'use strict';

var express = require('express');
var httpProxy = require('http-proxy');
var app = express();
var config = require('./config');

var proxy = new httpProxy.RoutingProxy();

// proxy.on('error', function () {
//   console.log('Start the target server!');
// });

function apiProxy() {
  return function (req, res, next) {
    if (req.url.match(new RegExp('^\/api\/'))) {
      console.log('wii')
      req.url = req.url.replace('/api', '');
      console.log(req.url);
      proxy.proxyRequest(req, res, {
        host: 'dog-training-api.herokuapp.com',
        port: 80,
        changeOrigin: true
      });
    } else {
      console.log('woo');
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
