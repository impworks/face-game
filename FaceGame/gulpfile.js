var gulp = require('gulp'),
    less = require("gulp-less"),
    concat = require("gulp-concat"),
    concatcss = require("gulp-concat-css"),
    uglify = require("gulp-uglify"),
    tsc = require("gulp-typescript"),
    tsProject = tsc.createProject('tsconfig.json');

gulp.task('lib:css', function () {
    return gulp.src([
            './Assets/styles/bootstrap.css',
            './Assets/styles/bootstrap-theme.css'
    ])
        .pipe(concatcss('libs.css'))
        .pipe(gulp.dest('./Content/styles'));
});

gulp.task('lib:scripts', function () {
    return gulp.src([
            './Scripts/Libs/jquery-1.10.2.js',
            './Scripts/Libs/bootstrap.js',
            './Scripts/Libs/react.js',
            './Scripts/Libs/react-dom.js',
            './Scripts/Libs/require.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./Content/scripts'));
});

gulp.task('lib:fonts', function() {
    return gulp.src([
            './Assets/fonts/*.*'
        ])
        .pipe(gulp.dest('./Content/fonts'));
});

gulp.task('app:less', function () {
    return gulp.src([
            './Assets/styles/*.less'
    ])
        .pipe(less())
        .pipe(concatcss('app.css'))
        .pipe(gulp.dest('./Content/styles'));
});

gulp.task('app:scripts', function () {
    return gulp.src([
            './Scripts/Source/Main.tsx'
    ])
        .pipe(tsc(tsProject))
        .pipe(gulp.dest('./Content/scripts'));
});

gulp.task('app', ['app:scripts', 'app:less']);
gulp.task('lib', ['lib:scripts', 'lib:css', 'lib:fonts']);
gulp.task('default', ['app', 'lib']);