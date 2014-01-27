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
                        $scope.totalItems = headers("X-Total");
                        $scope.pages = $scope.createPages(parseInt(headers("X-Total-Pages")));
                        $scope.totalPages = parseInt(headers("X-Total-Pages"));
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
            return result;
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
            return result;
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
                    $scope.totalItems = headers("X-Total");
                    $scope.pages = $scope.createPages(parseInt(headers("X-Total-Pages")));
                    $scope.totalPages = parseInt(headers("X-Total-Pages"));
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
    .controller('PaginationDemoCtrl', ['$scope', function($scope) {
        $scope.noOfPages = 7;
        $scope.currentPage = 4;
        $scope.maxSize = 5;

        $scope.pageChanged = function(page) {
            $scope.callbackPage = page;
            $scope.watchPage = newPage;
        };
    }]);