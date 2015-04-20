var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  sh = require('shelljs'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  ts = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  paths = {
    ts: ['./app/scripts/**/*.ts'],
    sass: ['./app/assets/sass/**/!(app)*.scss', './app/assets/sass/app.scss'],
    jade: ['./app/assets/views/**/*.jade'],
    image: ['./app/assets/images/**/*']
  };

gulp.task('default', ['sass', 'jade', 'ts', 'image', 'watch']);

gulp.task('ts', function() {
  var tsResult = gulp.src(paths.ts)
    .pipe(sourcemaps.init())
    .pipe(ts({
      sortOutput: true,
      target: 'ES5'
    }));

  return tsResult.js
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/build/js/'))
    .pipe(uglify({mangle: true}))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./public/build/js/'));
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/build/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./public/build/css/'))
    .on('end', done);
});

gulp.task('jade', function (done) {
  gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/build/views/'))
    .on('error', gutil.log)
    .on('error', gutil.beep)
    .on('end', done);
});

gulp.task('image', function () {
  gulp.src(paths.image).pipe(gulp.dest('./public/build/images'));
});

gulp.task('watch', ['sass', 'jade', 'ts'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.image, ['image']);
  gulp.watch(paths.ts, ['ts']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
