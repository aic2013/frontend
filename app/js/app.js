'use strict';

angular.module('aicGroup4',[
    'ngRoute',
    'aicGroup4.config',
    'aicGroup4.controllers',
    'aicGroup4.services',
    'aicGroup4.directives'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'partials/foo.html', controller: 'TestController' })
        .otherwise({ redirectTo: '/' });
}]);