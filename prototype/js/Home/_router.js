(function () {
    'use strict';

    angular
        .module('BlueprintApp')
        .config(Route);

    Route.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Route($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'Home/_template.html',
                controller: 'HomeController as home'
            });
    }
}());
