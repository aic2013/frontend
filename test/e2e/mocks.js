'use strict'

angular.module('aicGroup4Test',['aicGroup4', 'ngMockE2E'])
/*
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'partials/foo.html', controller: 'TestController' })
        .otherwise({ redirectTo: '/' });
}])
*/
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