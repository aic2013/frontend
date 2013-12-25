angular.module('aicGroup4.controllers',[])
    .controller('TestController', ['$scope', 'ConnectionTypes', 'Users', function($scope, ConnectionTypes, Users) {
        $scope.connectionType = "follows";
        $scope.connectionTypes = ConnectionTypes.query();
        $scope.users = Users.query();
    }]);