'use strict'

var config_module = angular.module('aicGroup4.config', []),
    config_data = {
        'CONFIG': {
            'API_URL': 'https://api.aic13.mmuehlberger.com'
        }
    };

angular.forEach(config_data, function(key, value) {
    config_module.constant(value, key);
});