(function () {
    'use strict';

    angular
        .module('BlueprintApp')
        .config(Debug)
        .config(Route404)
        .config(Rest)
        .config(CountWatchers);

    Debug.$inject = ['$compileProvider', '$logProvider', '$windowProvider'];
    function Debug($compileProvider, $logProvider, $window) {
        if (!$window.$get().debugMode) {
            $compileProvider.debugInfoEnabled(false);
        }
    }

    Route404.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Route404 ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }

    Rest.$inject = ['RestangularProvider', '$windowProvider'];
    function Rest (RestangularProvider, $window) {

        var rest_source = $window.$get().location.origin;

        RestangularProvider.setBaseUrl(rest_source + '/api/v1/');
        RestangularProvider.setDefaultHttpFields({cache: true});
        RestangularProvider.setRequestSuffix('/');
    }

    CountWatchers.$inject = ['$windowProvider'];
    function CountWatchers($window) {

        if ($window.$get().debugMode) {
            console.watchers = function() {
                var totalScopes = 0;
                var totalWatchers = 0;
                angular.element( ".ng-scope" ).each(
                    function ngScopeIterator() {
                        var scope = $( this ).scope();
                        totalScopes++;
                        totalWatchers += scope.$$watchers ?
                            scope.$$watchers.length :
                            0;

                    }
                );
                console.log('Number of scopes in current app: ' + totalScopes);
                console.log('Number of watchers in current app: ' + totalWatchers);

            };
        }
    }
}());
