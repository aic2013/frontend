'use strict'

angular.module('aicGroup4Test',['aicGroup4', 'ngMockE2E'])

/*
 * We are adding a 700 milliseconds delay to any response handled by the fake backend.
 * (Note that the pass-through responses are also delayed)
 * Basically we are wrapping the original $httpBackend ($delegate), with our own function,
 * which sets a timeout before calling the actual callback with the response data.
 */
.config(function($provide) {
    $provide.decorator('$httpBackend', function($delegate) {
        var proxy = function(method, url, data, callback, headers) {
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                }, 700);
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        for(var key in $delegate) {
            proxy[key] = $delegate[key];
        }
        return proxy;
    });
})
.run(function($httpBackend, CONFIG) {

    var connectionTypes = [
        { key: "follows", value: "Follows" },
        { key: "retweets", value: "Retweets" }
    ];

    var users = [
        {
            id: 123456,
            screen_name: 'mawo87',
            profile_image_url: "http:\/\/a2.twimg.com\/profile_images\/1438634086\/avatar_normal.png",
            location: "San Francisco, CA",
            followers_count: 21,
            friends_count: 32
        },
        {
            id: 123456,
            screen_name: 'mawo87',
            profile_image_url: "http:\/\/a2.twimg.com\/profile_images\/1438634086\/avatar_normal.png",
            location: "San Francisco, CA",
            followers_count: 21,
            friends_count: 32
        },
        {
            id: 123456,
            screen_name: 'mawo87',
            profile_image_url: "http:\/\/a2.twimg.com\/profile_images\/1438634086\/avatar_normal.png",
            location: "San Francisco, CA",
            followers_count: 21,
            friends_count: 32
        },
        {
            id: 123456,
            screen_name: 'mawo87',
            profile_image_url: "http:\/\/a2.twimg.com\/profile_images\/1438634086\/avatar_normal.png",
            location: "San Francisco, CA",
            followers_count: 21,
            friends_count: 32
        },
        {
            id: 123456,
            screen_name: 'mawo87',
            profile_image_url: "http:\/\/a2.twimg.com\/profile_images\/1438634086\/avatar_normal.png",
            location: "San Francisco, CA",
            followers_count: 21,
            friends_count: 32
        }
    ];

    //mock connection types
    $httpBackend.whenGET(CONFIG.API_URL + '/config/connection_types').respond(connectionTypes);

    //mock users
    $httpBackend.whenGET(CONFIG.API_URL + '/users/suggestions').respond(users);

    //don't mock the html views
    $httpBackend.whenGET(/partials\/\w+.*/).passThrough();
});