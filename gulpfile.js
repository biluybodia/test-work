var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    rename = require('gulp-rename'),
    del = require('del'),
    sass = require('gulp-sass'),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    imgCompress  = require('imagemin-jpeg-recompress');



/////////////////////////////////
/////////// scss
/////////////////////////////////

gulp.task('styles', function () {
    return gulp.src('dev/scss/**/*.scss')
        // .pipe(rename("main.scss"))
        .pipe(plumber())
        .pipe(sass())
        .on("error", notify.onError(function(error) {
            return "Something happened: " + error.message;
        }))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('static/css'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

/////////////////////////////////
/////////// browsersync
/////////////////////////////////

gulp.task('browsersync');

/////////////////////////////////
/////////// scripts
/////////////////////////////////

gulp.task('scripts', function() {
    return gulp
        .src('dev/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .on("error", notify.onError(function(error) {
            return "Something happened: " + error.message;
        }))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

/////////////////////////////////
/////////// fonts
/////////////////////////////////

gulp.task('fonts', function() {
    return gulp.src('dev/fonts/**/*.*')
        .pipe(gulp.dest('static/fonts'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

/////////////////////////////////
/////////// images
/////////////////////////////////

gulp.task('images', function() {
    return gulp.src(['dev/img/**/*.*'])
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle({interlaced: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('static/img'))
});

/////////////////////////////////
/////////// watch
/////////////////////////////////

gulp.task('watch', function() {
    gulp.watch('dev/scss/**/*.scss', ['styles']);
    gulp.watch('dev/js/**/*.js', ['scripts']);
});

/////////////////////////////////
/////////// clean
/////////////////////////////////

gulp.task('clean', function() {
    return del.sync('static');
});

/////////////////////////////////
/////////// build
/////////////////////////////////

gulp.task('build', ['clean', 'styles', 'scripts', 'images', 'fonts' ]);

/////////////////////////////////
/////////// default
/////////////////////////////////
gulp.task('default', ['watch']);
