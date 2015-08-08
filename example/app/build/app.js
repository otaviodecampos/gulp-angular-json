(function() {
    'use strict'

    angular.module('app', [
        
        'app.templates' 

    ]);

})();

(function() {
    'use strict'

    angular.module('app')
        .constant('APPDEMO', Constant());

    function Constant() {
        return {
          "name": "Demo",
          "version": "0.0.1",
          "description": "gulp-ng-json example",
          "author": {
                    "name": "otaviodecampos",
                    "email": "otaviodecampos@hotmail.com"
          }
};
    }

})();
