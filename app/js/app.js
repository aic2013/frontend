'use strict';

angular.module('aicGroup4',[
    'ngRoute',
    'ngTagsInput',
    'uiSlider',
    'aicGroup4.config',
    'aicGroup4.controllers',
    'aicGroup4.services',
    'aicGroup4.directives',
    'ngResource'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.responseInterceptors.push('myHttpInterceptor');

    var spinnerFunction = function spinnerFunction(data, headersGetter) {
        $("#loadingWidget").show();
        return data;
    };

    $httpProvider.defaults.transformRequest.push(spinnerFunction);

    $routeProvider
        .when('/', { templateUrl: 'partials/main.html' })
        .when('/users/topics', { templateUrl: 'partials/users/topics.html', controller: 'TopicsController' })
        .when('/users/suggestions', { templateUrl: 'partials/users/suggestions.html', controller: 'SuggestionsController' })
        .when('/ads', { templateUrl: 'partials/ads/ads.html', controller: 'AdsController' })
        .otherwise({ redirectTo: '/' });
}])
.factory('myHttpInterceptor', ['$q', '$window', function ($q, $window) {
    return function (promise) {
        return promise.then(function (response) {
            $("#loadingWidget").hide();
            return response;
        }, function (response) {
            $("#loadingWidget").hide();
            return $q.reject(response);
        });
    };
}]);