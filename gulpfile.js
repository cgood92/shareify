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
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    mmq = require('gulp-merge-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    filter = require('gulp-filter');


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

gulp.task('default', ['build']);
gulp.task('serve', ['build', 'browsersync-setup', 'watch']);
gulp.task('build', ['scripts', 'styles', 'copyHTML']);

gulp.task('browsersync-setup', ['build'], function() {
    var port = process.env.PORT || 4000;
    browserSync({
        open: 'local',
        port: 3000,
        server: {
            baseDir: 'dist'
        },
    });
});

gulp.task('scripts', function() {
	return browserify({
			entries: ['./src/main.js']
		})
        .transform(babelify)
		.bundle()
        .pipe(plumber({errorHandler: onError}))
		.pipe(source('./src/main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
		.pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('styles', function() {
    var cssFilter = filter(['**/*.css']);
    return gulp.src('./src/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({onError: customSassError}))
        .pipe(rename('all.min.css'))
        .pipe(mmq())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/'))
        .pipe(cssFilter)
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copyHTML', function() {
   gulp.src('./src/index.html')
   .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/index.html', ['copyHTML', browserSync.reload]);
    gulp.watch(['./src/*.js','./src/**/*.js'], ['scripts', browserSync.reload]);
    gulp.watch(['./src/*.scss','./src/**/*.scss'], ['styles']);
});

