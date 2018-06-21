const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');

const uglify = require('gulp-uglify');
const pump = require('pump');

const cssmin = require('gulp-cssmin');

const cleanCSS = require('gulp-clean-css');

//const jshint = require('gulp-jshint');
//const csslint = require('gulp-csslint');

//const align = require('gulp-align');

const htmlbeautify = require('gulp-html-beautify');

/*GULP-SASS*/

const sass = require('gulp-sass');
const rename = require("gulp-rename");

/*sprite*/

//const buffer = require('vinyl-buffer');
//const csso = require('gulp-csso');
//const merge = require('merge-stream');
//const spritesmith = require('gulp.spritesmith');

/*INLINE*/

const inlinesource = require('gulp-inline-source');


gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'merge-css', 'html-replace', 'compress-js', 'cssmin', 'htmlbeautify' ,'sassprod', 'inlinesource');
})

gulp.task('clean', function() {
    return gulp.src('dist')
               . pipe(clean() );
});

gulp.task('copy', ['clean'] ,  function() {

    gulp.src('src/**/*')
              .pipe(gulp.dest('dist') );
});


gulp.task('build-img',  function() {
    gulp.src('dist/img/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/img/') );

});

gulp.task('merge-css', function() {
     gulp.src(['dist/css/bootstrap.css',
              'dist/css/bootstrap.min.css',
              'dist/css/bootstrap-theme.css',
              'dist/css/bootstrap-theme.min.css',
              'dist/css/style.css',
              'dist/css/landing-page.css'])
        .pipe(concat('site.css') )
        .pipe(cleanCSS() )
        .pipe(gulp.dest('dist/css') );
 });

 gulp.task('html-replace', function() {
     gulp.src('src/**/*.html')
    .pipe(htmlReplace({css:'/dist/css/site.css'}))
    .pipe(gulp.dest('dist') );
 });

gulp.task('compress-js', function (cb) {
         gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function () {
     gulp.src('dist/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});


gulp.task('htmlbeautify', function() {
  var options = {    indentSize: 2
  };
   gulp.src('./src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('cleanscss', function() {
    return gulp.src('dist/scss')
        . pipe(clean());
});

gulp.task('sassprod', ['cleanscss'], function() {
    
    var sassProdOptions = {
        outputStyle: 'compressed'
    }
    
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        
        .pipe(rename({
            suffix: ".min",
        }))
        
        .pipe(gulp.dest('./dist/css/sassTeste/'));
});

/*
gulp.task('spritess', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('./dist/img/*.jpg')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
  }));
 
  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'));
 
  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(csso())
    .pipe(gulp.dest('./dist/css/'));
 
  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});
*/


gulp.task('inlinesource', function () {
    var options = {
        compress: false
    };
 
    return gulp.src('./dist/index.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist/'));
});
