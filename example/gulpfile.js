var gulp = require('gulp')
    , gulpc = require('gulp-context')
    , conf = require('./conf.json');

gulpc.build(conf);