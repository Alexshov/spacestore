var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('public/style/sass/spacestore.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions'], {cascade: true}))
        .pipe(gulp.dest('public/style/css'));
});

gulp.task('watch', function() {
    gulp.watch('public/style/sass/spacestore.sass', ['sass']);
})
