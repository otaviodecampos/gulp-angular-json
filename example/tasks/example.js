var gulp = require('gulp')
    , gulpaj = require('../../lib')
    , concat = require('gulp-concat');

module.exports = function () {

    var input = this.input(this.sourceDir, ['**/*.json']);

    return gulp.src(input)
        .pipe(gulpaj.constant())
        .pipe(gulpaj.module())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(this.targetDir));

}