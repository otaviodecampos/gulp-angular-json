# gulp-angular-json

Create angular components from json

## Installation

```
$ npm install gulp-ng-json --save-dev
```


## Usage

#### Create constants from json

Create a json like this
```json
// app.constant.json
{
	"name": "Demo",
    "version": "0.0.1",
    "description": "gulp-ng-json demo"
}
```

Create gulp task like this

```javascript
var gulp = require('gulp')
	, ngjson = require('gulp-ng-json')
	, concat = require('gulp-concat');

gulp.task('test', function () {
  gulp.src('**/*.json')
  .pipe(ngjson.constant())
  .pipe(concat('app.js'))
  .pipe(gulp.dest('.'));
});
```

And app.js will be generated like this
```javascript
(function() {
    'use strict'

    angular.module('app')
        .constant('APP', Constant());

    function Constant() {
        return {
          "name": "Demo",
          "version": "0.0.1",
          "description": "gulp-ng-json demo"
		}
    }

})();
```

#### Create modules from json

Create a json like this
```json
// app.module.json
{
    "name": "app",
    "dependencies": [
        "app.templates"
    ]
}
```

Create gulp task like this

```javascript
var gulp = require('gulp')
	, ngjson = require('gulp-ng-json')
	, concat = require('gulp-concat');

gulp.task('test', function () {
  gulp.src('**/*.json')
  .pipe(ngjson.module())
  .pipe(concat('app.js'))
  .pipe(gulp.dest('.'));
});
```

And app.js will be generated like this
```javascript
(function() {
    'use strict'

    angular.module('app', [
        'app.templates'
    ]);

})();
```


## Options

#### Constants

You can specify the name of the constant and the module name where the constant is included.

```json
{
    "$constant": {
        "$name": "APPDEMO",
        "$module": "app"
    }
}
```

By default they are converted json extension "* .constant.json", but you can pass the regular expression used.

```javascript
var options = {matcher: /[\w-]+.constant.json$/g};
ngjson.constant(options);
```

###### Other options

| Option        | Description | Value
| ------------- |-------------| -----
| matcher       | Filename to be sought | regex
| nominator     | Define the constant name | function
| parser        | Json converter to object | function
| automodule    | Search module.json to set the module that constant will be included | boolean
| template      | Template file path that will be used to create a constant | string

#### Modules

```javascript
var options = {matcher: /[\w-]+.module.json$/g};
ngjson.module(options);
```

As well as constant, the modules can be informed with specific options

| Option        | Description | Value
| ------------- |-------------| -----
| matcher       | Filename to be sought | regex
| template     | Template file path that will be used to create a constant  | string
