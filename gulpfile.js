var gulp = require('gulp');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var template = require('gulp-template');
var refresh = require('gulp-livereload');
var browserify = require('gulp-browserify');
var connect = require('connect');
var lr = require('tiny-lr');
var t = require('lodash').template;
var es = require('event-stream');
var path = require('path');

var port = 9000;
var server = lr();

gulp.task('styles', function () {
	gulp.src('app/styles/**/*.css')
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
  	.listen(port);

	console.log('Server listening on http://localhost:' + port);
});

gulp.task('server', function() {
	gulp.run('lr-server');

	gulp.watch('app/scripts/**/*.js', function(e) {
		gulp.run('scripts');
	});

	gulp.watch('app/styles/**/*.css', function(e) {
		gulp.run('styles');
	});

	gulp.run('http-server');
});

gulp.task('default', function() {
	gulp.run('scripts', 'styles');    
});