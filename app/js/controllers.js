angular.module('aicGroup4.controllers',[])
    .controller('TopicsController', ['$scope', 'ConnectionTypes', 'Users', function($scope, ConnectionTypes, Users) {

        $scope.connectionTypes = ConnectionTypes.query();
        $scope.depthValues = [1, 2];

        $scope.queryParams = {
            connectionType: "follows",
            depth: 2
        };

        $scope.users = Users.query();
    }])
    .controller('SuggestionsController', ['$scope', function($scope) {

    }]);