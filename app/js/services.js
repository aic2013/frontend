angular.module('aicGroup4.services', ['ngResource'])
    .factory('ConnectionTypes', ['$resource', 'CONFIG', function($resource, CONFIG) {
        return $resource(CONFIG.API_URL + '/config/connection_types/:id', { id: '@id' });
    }])
    .factory('Users', ['$resource', 'CONFIG', function($resource, CONFIG) {
        return $resource(CONFIG.API_URL + '/users/suggestions', {});
    }]);