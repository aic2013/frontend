'use strict'

var config_module = angular.module('aicGroup4.config', []),
    config_data = {
        'CONFIG': {
            'API_URL': 'http://localhost:8080/aic'
        }
    };

angular.forEach(config_data, function(key, value) {
    config_module.constant(value, key);
});