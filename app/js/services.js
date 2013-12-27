angular.module('aicGroup4.services', ['ngResource'])
    .factory('ConnectionTypes', ['$resource', 'CONFIG', function($resource, CONFIG) {
        return $resource(CONFIG.API_URL + '/config/connection_types/:id', { id: '@id' });
    }])
    /*
    .factory('Users', ['$http', 'CONFIG', function($http, CONFIG) {
        var User = function(data) {
            angular.extend(this, data);
        }

        User.get = function (depth, page) {
            return $http.get(CONFIG.API_URL + '/users/topics').then(function(response) {
                console.log(response.data);
                return new User(response.data);
            });
        };

        return User;
    }]);
    */
    .factory('Users', ['$resource', '$q', 'CONFIG', function($resource, $q, CONFIG) {
        return $resource(CONFIG.API_URL + '/users/topics', {});
    }]);