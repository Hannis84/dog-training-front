'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var connect = require('connect');
var t = require('lodash').template;
var es = require('event-stream');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = new httpProxy.RoutingProxy();
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');

var production = false;

proxy.on('error', function () {
  console.log('Start the target server!');
});

gulp.task('styles', function () {
  var dest = production ? 'dist/styles' : '.tmp/styles';

	gulp.src('app/styles/main.scss')
    .pipe(sass())
    .on('error', console.log)
    .pipe(prefix('last 1 version', '> 1%'))
    .pipe(minify())
    .pipe(gulp.dest(dest));

  gulp.src('app/styles/bootstrap/fonts/bootstrap/*')
    .pipe(gulp.dest(dest + '/bootstrap'));

  gulp.src('app/styles/fonts/*')
    .pipe(gulp.dest(dest + '/fonts'));
});

gulp.task('scripts', function () {
  var dest = production ? 'dist/scripts' : '.tmp/scripts';

	es.merge(
    gulp.src('app/scripts/main.js')
    	.pipe(browserify())
      .on('error', console.log),
    gulp.src('app/scripts/templates/*.html')
      .pipe(es.map(function(file, cb) {
        var contents = t(file.contents.toString()).source;
        file.contents = new Buffer("(function () { (window['JST'] = window['JST'] || {})['" + path.basename(file.path , path.extname(file.path).toLowerCase()) + "'] = " + contents + "; })();");
        cb(null, file);
      }))
  ).pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dest));
});

gulp.task('images', function () {
  return gulp.src('app/images/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html', function () {
  return gulp.src(['app/index.html', 'app/404.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
	var app = connect()
  	.use(require('connect-livereload')({port: 35729}))
    .use(connect.static('.tmp'))
  	.use(connect.static('app'))
    .use(connect.directory('app'))
  	.use(function (req, res) {
      if (req.url.indexOf('/api') === 0) {
        req.url = req.url.split('/api').pop();
        proxy.proxyRequest(req, res, {
          host: '127.0.0.1',
          port: '3000'
        });
      }
    });

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Server listening on http://localhost:9000');
    });
});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('build', ['scripts', 'styles', 'images', 'html']);

gulp.task('dist', ['clean'], function () {
  production = true;
  gulp.start('build');
});

gulp.task('default', ['connect', 'scripts', 'styles', 'images'], function () {
  var server = livereload();

  gulp.watch([
    '.tmp/styles/*.css',
    '.tmp/scripts/**/*.js'
    ], function (file) {
      server.changed(file.path);
    });

  gulp.watch(['app/scripts/**/*.js', 'app/scripts/templates/**.html'], ['scripts']);
  gulp.watch(['app/styles/*.scss', 'app/styles/**/*.scss'], ['styles']);
});
