'use strict';

angular.module('aicGroup4',[
    'ngRoute',
    'ngTagsInput',
    'aicGroup4.config',
    'aicGroup4.controllers',
    'aicGroup4.services',
    'aicGroup4.directives'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'partials/main.html' })
        .when('/users/topics', { templateUrl: 'partials/users/topics.html', controller: 'TopicsController' })
        .when('/users/suggestions', { templateUrl: 'partials/users/suggestions.html', controller: 'SuggestionsController' })
        .otherwise({ redirectTo: '/' });
}]);