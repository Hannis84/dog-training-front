var gulp = require('gulp');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var template = require('gulp-template');
var refresh = require('gulp-livereload');
var browserify = require('gulp-browserify');
var prefix = require('gulp-autoprefixer');
var connect = require('connect');
var lr = require('tiny-lr');
var t = require('lodash').template;
var es = require('event-stream');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

proxy.on('error', function () {
  console.log('Start the target server!');
});

var port = 9000;
var server = lr();

gulp.task('styles', function () {
	gulp.src('app/styles/**/*.css')
    .pipe(prefix("last 1 version", "> 1%"))
  	.pipe(concat('main.css'))
  	.pipe(gulp.dest('app/dist'))
  	.pipe(refresh(server));
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
  .pipe(gulp.dest('app/dist'))
  .pipe(refresh(server));
});

gulp.task('lr-server', function(){  
	server.listen(35729, function(err){
		if (err) return console.log(err);
	});
});

gulp.task('http-server', function() {
	connect()
  	.use(require('connect-livereload')())
  	.use(connect.static('app'))
  	.use(function (req, res) {
      if (req.url.indexOf('/api') === 0) {
        req.url = req.url.split('/api').pop();
        proxy.web(req, res, {
          target: 'http://127.0.0.1:3000'
        });
      }
    }).listen(port);

	console.log('Server listening on http://localhost:' + port);
});

gulp.task('default', function () {
  gulp.start('scripts', 'styles', 'lr-server', 'http-server');

  gulp.watch(['app/scripts/**/*.js', 'app/scripts/templates/**.html'], ['scripts']);
  gulp.watch('app/styles/**/*.less', ['styles']);
});