var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat');

module.exports = function () {

    var input = this.input(this.srcDir, ['**/*.json']);

    return gulp.src(input)
        .pipe(ngjson.state())
        .pipe(ngjson.constant())
        .pipe(ngjson.module())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(this.buildDir));

}