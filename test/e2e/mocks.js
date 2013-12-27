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
            favorite_count: 12,
            friend_count: 32,
            follower_count: 18,
            status_count: 10,
            listed_count: 20,
            name: "Max Mustermann",
            screen_name: "mawo87",
            language: "de",
            profile_image_url: "http://a0.twimg.com/sticky/default_profile_images/default_profile_6_normal.png",
            location: "San Francisco, CA"
        },
        {
            id: 123456,
            favorite_count: 12,
            friend_count: 32,
            follower_count: 18,
            status_count: 10,
            listed_count: 20,
            name: "Max Mustermann",
            screen_name: "mawo87",
            language: "de",
            profile_image_url: "http://a0.twimg.com/sticky/default_profile_images/default_profile_6_normal.png",
            location: "San Francisco, CA"
        },
        {
            id: 123456,
            favorite_count: 12,
            friend_count: 32,
            follower_count: 18,
            status_count: 10,
            listed_count: 20,
            name: "Max Mustermann",
            screen_name: "mawo87",
            language: "de",
            profile_image_url: "http://a0.twimg.com/sticky/default_profile_images/default_profile_6_normal.png",
            location: "San Francisco, CA"
        },
        {
            id: 123456,
            favorite_count: 12,
            friend_count: 32,
            follower_count: 18,
            status_count: 10,
            listed_count: 20,
            name: "Max Mustermann",
            screen_name: "mawo87",
            language: "de",
            profile_image_url: "http://a0.twimg.com/sticky/default_profile_images/default_profile_6_normal.png",
            location: "San Francisco, CA"
        },
        {
            id: 123456,
            favorite_count: 12,
            friend_count: 32,
            follower_count: 18,
            status_count: 10,
            listed_count: 20,
            name: "Max Mustermann",
            screen_name: "mawo87",
            language: "de",
            profile_image_url: "http://a0.twimg.com/sticky/default_profile_images/default_profile_6_normal.png",
            location: "San Francisco, CA"
        }
    ];

    //mock connection types
    $httpBackend.whenGET(CONFIG.API_URL + '/config/connection_types').respond(connectionTypes);

    //mock users
    $httpBackend.whenGET(CONFIG.API_URL + '/users/topics?depth=2&page=1&topics%5B%5D=Apple').respond(users.slice(0,4));
    $httpBackend.whenGET(CONFIG.API_URL + '/users/topics?depth=2&page=1&topics%5B%5D=Apple&topics%5B%5D=IPhone').respond(users.slice(0,3));
    $httpBackend.whenGET(CONFIG.API_URL + '/users/topics?depth=2&page=1&topics%5B%5D=foo').respond([]);
    $httpBackend.whenGET(CONFIG.API_URL + '/users/topics?depth=1&page=1').respond(users.slice(0,2));

    //don't mock the html views
    $httpBackend.whenGET(/partials\/\w+.*/).passThrough();
});