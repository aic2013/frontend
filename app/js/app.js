'use strict';

angular.module('aicGroup4',[
    'ngRoute',
    'ngTagsInput',
    'uiSlider',
    'aicGroup4.config',
    'aicGroup4.controllers',
    'aicGroup4.services',
    'aicGroup4.directives'
])
.constant('_START_REQUEST_', '_START_REQUEST_')
.constant('_END_REQUEST_', '_END_REQUEST_')
.config(['$routeProvider', '$httpProvider', '_START_REQUEST_', '_END_REQUEST_', function ($routeProvider, $httpProvider, _START_REQUEST_, _END_REQUEST_) {
    var $http,
        interceptor = ['$q', '$injector', function($q, $injector) {
            var rootScope;

            function success(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    // get $rootScope via $injector because of circular dependency problem
                    rootScope = rootScope || $injector.get('$rootScope');
                    // send a notification requests are complete
                    rootScope.$broadcast(_END_REQUEST_);
                }
                return response;
            }

            function error(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    // get $rootScope via $injector because of circular dependency problem
                    rootScope = rootScope || $injector.get('$rootScope');
                    // send a notification requests are complete
                    rootScope.$broadcast(_END_REQUEST_);
                }
                return $q.reject(response);
            }

            return function (promise) {
                // get $rootScope via $injector because of circular dependency problem
                rootScope = rootScope || $injector.get('$rootScope');
                // send notification a request has started
                rootScope.$broadcast(_START_REQUEST_);
                return promise.then(success, error);
            }
        }];

    $httpProvider.responseInterceptors.push(interceptor);

    $routeProvider
        .when('/', { templateUrl: 'partials/main.html' })
        .when('/users/topics', { templateUrl: 'partials/users/topics.html', controller: 'TopicsController' })
        .when('/users/suggestions', { templateUrl: 'partials/users/suggestions.html', controller: 'SuggestionsController' })
        .otherwise({ redirectTo: '/' });
}]);