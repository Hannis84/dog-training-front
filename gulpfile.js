var gulp = require('gulp');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var template = require('gulp-template');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var prefix = require('gulp-autoprefixer');
var connect = require('connect');
var lr = require('tiny-lr');
var t = require('lodash').template;
var es = require('event-stream');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');

proxy.on('error', function () {
  console.log('Start the target server!');
});

gulp.task('styles', function () {
	gulp.src('app/styles/main.scss')
    .pipe(sass())
    .pipe(prefix("last 1 version", "> 1%"))
  	.pipe(gulp.dest('.tmp/styles'))

  gulp.src('app/styles/bootstrap/fonts/bootstrap/*')
    .pipe(gulp.dest('.tmp/styles/bootstrap'));
});

gulp.task('scripts', function () {
	es.merge(
    gulp.src('app/scripts/main.js')
    	.pipe(browserify()),
    gulp.src('app/scripts/templates/*.html')
      .pipe(es.map(function(file, cb) {
        var contents = t(file.contents.toString()).source;
        file.contents = new Buffer("(function () { (window['JST'] = window['JST'] || {})['" + path.basename(file.path , path.extname(file.path).toLowerCase()) + "'] = " + contents + "; })();");
        cb(null, file);
      }))
  ).pipe(concat('main.js'))
  .pipe(gulp.dest('.tmp/scripts'))
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
        proxy.web(req, res, {
          target: 'http://127.0.0.1:3000'
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
  return gulp.src('.tmp', {read: false}).pipe(clean());
});

gulp.task('default', ['connect', 'scripts', 'styles'], function () {
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
