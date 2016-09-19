require('babel/register');

var browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    glob = require('glob'),
    sourcemaps = require('gulp-sourcemaps'),
    babelify = require('babelify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    es = require('event-stream'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    browserSync = require('browser-sync');


//////////////////////////////////////////////////
// ERRORS
//////////////////////////////////////////////////

var onError = function (err) {
    var errorMessage = '';
    util.beep();
    errorMessage += util.colors.red('\n-----------------------------------');
    errorMessage += util.colors.red('\n' + err.message);
    errorMessage += util.colors.red('\n-----------------------------------');
    console.log(errorMessage);
    this.emit('end');
};

var customSassError = function (err) {
    var errorMessage = '';
    util.beep();
    errorMessage += util.colors.red('\n-----------------------------------');
    errorMessage += util.colors.red('\n' + err.file);
    errorMessage += util.colors.red('\n' + err.message);
    errorMessage += util.colors.red('\nline: ' + err.line + ' col: ' + err.column);
    errorMessage += util.colors.red('\n-----------------------------------');
    errorMessage += '\n';
    console.log(errorMessage);
};

gulp.task('default', ['build', 'browsersync-setup', 'watch']);
gulp.task('build', ['scripts']);

gulp.task('browsersync-setup', ['build'], function() {
    var port = process.env.PORT || 4000;
    browserSync({
        open: false,
        port: 3000,
        server: true
    });
});

gulp.task('scripts', function() {
    glob('./src/main.js', function(err, files) {
    	if (err) done(err);

    	var tasks = files.map(function(entry) {
    		return browserify({
    				entries: [entry]
    			})
                .transform(babelify)
    			.bundle()
                .pipe(plumber({errorHandler: onError}))
    			.pipe(source(entry))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
    			.pipe(rename(function (path) {
                   path.dirname = '';
                   path.extname = '.min.js';
                }))
                //.pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/'));
    	});
    	es.merge(tasks);
        browserSync.reload()
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/*.js','./src/**/*.js'], ['scripts']);
});

