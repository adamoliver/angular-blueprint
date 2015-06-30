(function () {
    'use strict';

    angular
        .module('BlueprintApp')
        .controller('HomeController', Controller);

    Controller.$inject = [];
    function Controller () {
        var home = this;

        var data = [
            {
                "id": 1,
                "name": "Adam Oliver"
            },
            {
                "id": 2,
                "name": "Pamela Bryden"
            }
        ]

        activate();

        function activate () {
            home.data = data;
        }

    }
}());



