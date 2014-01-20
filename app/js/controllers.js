angular.module('aicGroup4.controllers',[])
    .controller('NavigationController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    }])
    .controller('TopicsController', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {

        $scope.depthOptions = [1, 2, 3];

        //defaults
        $scope.topics = [];
        $scope.depth = 2;
        $scope.page = 1;
        $scope.isWarning = false;
        $scope.users = [];

        $scope.currentPage = 1;
        $scope.totalPages = 2;

        $scope.usersCount = 0;

        $scope.updateResults = function() {
            if ($scope.topics.length > 0) {
                Users.query({
                    "topics[]": $scope.topics,
                    depth: $scope.depth,
                    page: $scope.page
                }, function(data, headers){


                    console.log("data ", data);
                    console.log("headers ", headers);
                    console.log("X-Total-Pages ", headers("X-Total-Pages"));

                    /*
                    console.log(response("X-Total-Pages"));

                    var totalPages = response("X-Total-Pages"),
                        totalItems = response("X-Total"),
                        currentPage = response("X-Page"),
                        itemsPerPage = response("X-Per-Page");

                    $scope.totalPages = totalPages;
                    $scope.pageCount = totalPages;
                    $scope.usersCount = totalItems;
                    $scope.currentPage = currentPage;

                    console.log(itemsPerPage, totalPages, totalItems, currentPage);
                    */

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

        $scope.selectPage = function (pageNo) {
            console.log("foo");
            console.log(pageNo);

            $scope.currentPage = pageNo;
        };

        /*
        $scope.$on('page.changed', function(event, data) {
            console.log("page changed");
            $scope.page = data.page;
            $scope.updateResults();
        });
        */

        $scope.showWarning = function(message) {
            $scope.isWarning = true;
            $scope.warningMessage = message;
        };

        $scope.hideWarning = function() {
            $scope.isWarning = false;
        };

        $scope.updateResults();
    }])
    .controller('SuggestionsController', ['$scope', 'ConnectionTypes', 'Users', function($scope, ConnectionTypes, Users) {

        //defaults
        $scope.connectionTypeSelection = [];
        $scope.usersCount = 0;
        $scope.users = [];
        $scope.isWarning = false;
        $scope.minRange = 0;
        $scope.maxRange = 0.5;

        $scope.connectionTypes = ConnectionTypes.query();

        $scope.toggleSelection = function(key) {
            var idx = $scope.connectionTypeSelection.indexOf(key);

            if (idx > -1) {
                $scope.connectionTypeSelection.splice(idx, 1);
            } else {
                $scope.connectionTypeSelection.push(key);
            }
        };

        $scope.showWarning = function(message) {
            $scope.isWarning = true;
            $scope.warningMessage = message;
        };

        $scope.hideWarning = function() {
            $scope.isWarning = false;
        };

        $scope.updateResults = function() {

            Users.query({
                "connection_types[]": $scope.connectionTypeSelection,
                min_range: $scope.minRange,
                max_range: $scope.maxRange,
                page: $scope.page
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

        $scope.updateResults();
    }]);