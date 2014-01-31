angular.module('aicGroup4.controllers', [])
    .controller('NavigationController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    }])
    .controller('TopicsController', ['$scope', '$rootScope', '$timeout', 'Users', function($scope, $rootScope, $timeout, Users) {

        $scope.depthOptions = [1, 2, 3];

        //defaults
        $scope.topics = [];
        $scope.depth = 2;
        $scope.page = 1;
        $scope.totalPages = 1;
        $scope.totalItems = 0;
        $scope.maxPages = 10;
        $scope.fromPage = 0;
        $scope.toPage = 10;
        $scope.isWarning = false;
        $scope.users = [];
        $scope.usersCount = 0;

        $scope.updateResults = function() {
            if ($scope.topics.length > 0) {
                Users.query({
                    "topics[]": $scope.topics,
                    depth: $scope.depth,
                    page: $scope.page
                }, function(data, headers){
                    $timeout(function () {
                        var currentPage = parseInt(headers("X-Page"));

                        if (currentPage > $scope.toPage) {
                            $scope.fromPage = $scope.toPage;
                            $scope.toPage = $scope.fromPage + $scope.maxPages;
                        }

                        if (currentPage == $scope.fromPage) {
                            $scope.fromPage = $scope.fromPage - $scope.maxPages;
                            $scope.toPage = $scope.fromPage + $scope.maxPages;
                        }

                        //defaults for "jump to begin"
                        if (currentPage == 1) {
                            $scope.fromPage = 0;
                            $scope.toPage = 10;
                        }

                        //"jump to end"
                        if (currentPage == $scope.totalPages) {

                        }

                        $scope.totalItems = headers("X-Total");
                        $scope.pages = $scope.createPages(parseInt(headers("X-Total-Pages")));
                        $scope.totalPages = parseInt(headers("X-Total-Pages"));
                        $scope.currentPage = currentPage;
                    });
                }).$promise.then(function(result) {
                        $scope.users = result;
                        if (result.length > 0) {
                            $scope.hideWarning();
                        } else {
                            $scope.showWarning("Your search did not return any results. Please try different search criteria.");
                        }
                    },
                    function(error) {
                        console.log("error fetching users based on topics");
                    }
                );
            }
        };

        $scope.createPages = function(pages) {
            var page = 1,
                result = [],
                total = parseInt(pages);
            while (page <= total) {
                result.push(page);
                page++
            }
            return result.slice($scope.fromPage, $scope.toPage);
        };

        $scope.setPage = function(page) {
            $scope.page = page;
            $scope.updateResults();
        };

        $scope.showWarning = function(message) {
            $scope.isWarning = true;
            $scope.warningMessage = message;
        };

        $scope.hideWarning = function() {
            $scope.isWarning = false;
        };

        $scope.updateResults();
    }])
    .controller('SuggestionsController', ['$scope', '$timeout', 'ConnectionTypes', 'Suggestions', function($scope, $timeout, ConnectionTypes, Suggestions) {

        //defaults
        $scope.connectionTypeSelection = [];
        $scope.minRange = 0;
        $scope.maxRange = 0.5;
        $scope.page = 1;
        $scope.totalPages = 1;
        $scope.totalItems = 0;
        $scope.maxPages = 10;
        $scope.fromPage = 0;
        $scope.toPage = 10;
        $scope.isWarning = false;
        $scope.usersCount = 0;
        $scope.users = [];

        $scope.connectionTypes = ConnectionTypes.query();

        $scope.toggleSelection = function(key) {
            var idx = $scope.connectionTypeSelection.indexOf(key);

            if (idx > -1) {
                $scope.connectionTypeSelection.splice(idx, 1);
            } else {
                $scope.connectionTypeSelection.push(key);
            }
        };

        $scope.createPages = function(pages) {
            var page = 1,
                result = [],
                total = parseInt(pages);
            while (page <= total) {
                result.push(page);
                page++
            }
            return result.slice($scope.fromPage, $scope.toPage);
        };

        $scope.setPage = function(page) {
            $scope.page = page;
            $scope.updateResults();
        };

        $scope.showWarning = function(message) {
            $scope.isWarning = true;
            $scope.warningMessage = message;
        };

        $scope.hideWarning = function() {
            $scope.isWarning = false;
        };

        $scope.updateResults = function() {

            Suggestions.query({
                "connection_types[]": $scope.connectionTypeSelection,
                min_range: $scope.minRange,
                max_range: $scope.maxRange,
                page: $scope.page
            }, function(data, headers) {
                $timeout(function () {
                    var currentPage = parseInt(headers("X-Page"));

                    if (currentPage > $scope.toPage) {
                        $scope.fromPage = $scope.toPage;
                        $scope.toPage = $scope.fromPage + $scope.maxPages;
                    }

                    if (currentPage == $scope.fromPage) {
                        $scope.fromPage = $scope.fromPage - $scope.maxPages;
                        $scope.toPage = $scope.fromPage + $scope.maxPages;
                    }

                    $scope.totalItems = headers("X-Total");
                    $scope.pages = $scope.createPages(parseInt(headers("X-Total-Pages")));
                    $scope.totalPages = parseInt(headers("X-Total-Pages"));
                    $scope.currentPage = currentPage;
                });
            }).$promise.then(function(result) {
                    $scope.users = result;
                    if (result.length > 0) {
                        $scope.hideWarning();
                    } else {
                        $scope.showWarning("Your search did not return any results. Please try different search criteria.");
                    }
                },
                function(error) {
                    console.log("error fetching users based on suggestions");
                }
            );
        };
    }])
    .controller('AdsController', ['$scope', 'Ads', function($scope, Ads) {

        $scope.user = "";
        $scope.isWarning = false;

        $scope.showWarning = function(message) {
            $scope.isWarning = true;
            $scope.warningMessage = message;
        };

        $scope.hideWarning = function() {
            $scope.isWarning = false;
        };

        $scope.updateResults = function() {
            Ads.get({
                userId: $scope.user
            }).$promise.then(function(result) {
                $scope.ads = result.ads;
                    if (result && result.ads && result.ads.length > 0) {
                        $scope.hideWarning();
                    } else {
                        $scope.showWarning("No ads available for given user.");
                    }
                },
                function(error) {
                    console.log("error fetching ads for user");
                });
        };

        /*
        $scope.ads = [
            { id: 1, title: "Audi - It drives you", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a sem tortor. Vestibulum aliquam viverra viverra. Maecenas vitae neque risus. Etiam mi metus, porta eget ante vel, porta vestibulum elit. Ut accumsan dictum rutrum. In hac habitasse platea dictumst. Praesent dignissim nec erat et tincidunt. Curabitur ut tristique diam. Praesent sit amet magna sit amet magna dapibus aliquam et sed. ", image_url: "http://m1.behance.net/rendition/modules/18120479/disp/9c12b198d8e1a4927e48b1216ecf30dc.jpg", url: "" },
            { id: 1, title: "The new BMW 3series", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a sem tortor. Vestibulum aliquam viverra viverra. Maecenas vitae neque risus. Etiam mi metus, porta eget ante vel, porta vestibulum elit. Ut accumsan dictum rutrum. In hac habitasse platea dictumst. Praesent dignissim nec erat et tincidunt. Curabitur ut tristique diam. Praesent sit amet magna sit amet magna dapibus aliquam et sed. ", image_url: "http://m1.behance.net/rendition/modules/18120479/disp/9c12b198d8e1a4927e48b1216ecf30dc.jpg", url: "" },
            { id: 1, title: "Audi - It drives you", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a sem tortor. Vestibulum aliquam viverra viverra. Maecenas vitae neque risus. Etiam mi metus, porta eget ante vel, porta vestibulum elit. Ut accumsan dictum rutrum. In hac habitasse platea dictumst. Praesent dignissim nec erat et tincidunt. Curabitur ut tristique diam. Praesent sit amet magna sit amet magna dapibus aliquam et sed. ", image_url: "http://m1.behance.net/rendition/modules/18120479/disp/9c12b198d8e1a4927e48b1216ecf30dc.jpg", url: "" }
        ]
        */
    }]);