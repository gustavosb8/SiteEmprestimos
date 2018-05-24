const gulp =          require('gulp');
const imagemin =      require('gulp-imagemin');
const clean =         require('gulp-clean');
const concat =        require('gulp-concat');
const htmlReplace =   require('gulp-html-replace');

const uglify =        require('gulp-uglify');
const pump =          require('pump');

const cssmin =        require('gulp-cssmin');

const cleanCSS =      require('gulp-clean-css');
const browserSync =   require('browser-sync');

const jshint =        require('gulp-jshint');
const csslint =       require('gulp-csslint');

const align =         require('gulp-align');

const htmlbeautify =  require('gulp-html-beautify');

gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'merge-css', 'html-replace', 'compress-js', 'cssmin', 'jshint', 'csslint', 'align', 'htmlbeautify');
})

gulp.task('clean', function() {
    return gulp.src('dist')
               . pipe(clean() );
});

gulp.task('copy', ['clean'] ,  function() {

   return gulp.src('src/**/*')
              .pipe(gulp.dest('dist') );
});


gulp.task('build-img',  function() {
    gulp.src('dist/img/**/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/img') );

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

gulp.task('jshint', function() {
  return gulp.src('./dist/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', function() {
    
  csslint.addFormatter('csslint-stylish');
    
  gulp.src('dist/css/site.css')
    .pipe(csslint({'shorthand' : true}))
    .pipe(csslint.formatter('stylish'));
});

gulp.task('align', function () {
    return gulp.src('./gulpfile.js')
        .pipe(align())
        .pipe(gulp.dest('./dist/'))
})

gulp.task('htmlbeautify', function() {
  var options = {
    indentSize: 2
  };
  gulp.src('./src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/'))
});