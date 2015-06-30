(function () {
    'use strict';

    angular
        .module('BlueprintApp')
        .directive('dualSelects', Directive);

    // Element: <div dual-selects></div>
    // Attributes:

    function Directive () {
        var directive = {
            templateUrl: 'Home/dual_selects.html',
            restrict: 'A',
            replace: true,
            scope: {
                data: "=",
                selectedData: "="
            },
            link: link
        };

        return directive;

        function link (scope, element, attrs) {
            scope.removeItems = removeItems;
            scope.addItems = addItems;
            scope.selectedData = [];

            function addItems () {
                $(element).find('.original-data :selected').each(function(i, selected){
                    scope.data = _.reject(scope.data, function(item) {
                        return item.id === Number($(selected).val());
                    });

                    scope.selectedData.push({
                        "id": Number($(selected).val()),
                        "name": $(selected).text()
                    });
                });
            }

            function removeItems() {
                $(element).find('.selected-data :selected').each(function(i, selected){
                    scope.selectedData = _.reject(scope.selectedData, function(item) {
                        return item.id === Number($(selected).val());
                    });

                    scope.data.push({
                        "id": Number($(selected).val()),
                        "name": $(selected).text()
                    });
                });
            }
        }

    }
}());

// 'use strict';
//
// describe('Directive: dual-selects', function() {
//
//     beforeEach(module('BlueprintApp'));
//     beforeEach(module('templates'));
//
//     describe('Test case', function() {
//
//         var rootScope;
//         beforeEach(inject(function($rootScope) {
//             rootScope = $rootScope.$new();
//         }));
//
//         var element, scope
//         beforeEach(inject(function($compile) {
//
//             element = angular.element(
//                 '<div twig-dual-selects ></div>'
//             );
//
//             $compile(element)(rootScope);
//             rootScope.$digest();
//             scope = element.isolateScope();
//         }));
//
//         it('should be tested', function(){
//             throw "twigdual-selects has no tests !";
//         });
//     });
// });
