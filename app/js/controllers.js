angular.module('aicGroup4.controllers',[])
    .controller('TopicsController', ['$scope', 'Users', function($scope, Users) {

        $scope.depthOptions = [1, 2, 3];

        //defaults
        $scope.topics = [];
        $scope.depth = 2;
        $scope.page = 1;
        $scope.warning = false;
        $scope.users = [];

        $scope.updateResults = function() {
            if ($scope.topics.length > 0) {
                Users.query({
                    "topics[]": $scope.topics,
                    depth: $scope.depth,
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
                        console.log("oops error");
                    }
                );
            }
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
    .controller('SuggestionsController', ['$scope', 'ConnectionTypes', function($scope, ConnectionTypes) {

        //defaults
        $scope.connectionType =  "follows";

        $scope.connectionTypes = ConnectionTypes.query();
    }]);