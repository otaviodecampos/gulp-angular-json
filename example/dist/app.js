(function() {
    'use strict'

    angular.module('app', [
        
        'dep-example' 

    ]);

})();

(function() {
    'use strict'

    angular.module('app')
        .constant('APP', Constant());

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

(function() {
    'use strict'

    angular.module('app')
        .config(State);

    State.$inject = ['$stateProvider'];
    function State($stateProvider) {

        $stateProvider
            .state('admin', {
				"url": "",
				"abstract": true,
				"templateUrl": "example.tpl.html"
});

    };

})();