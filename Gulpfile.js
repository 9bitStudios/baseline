var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('sass', function() {
    return gulp.src('src/scss/baseline.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('transpile', function () {
    return browserify({entries: './src/js/Baseline.js', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('baseline.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['transpile']);
    gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('default', ['watch']);