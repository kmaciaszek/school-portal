/* global angular */

function NavigationBarController($scope, $location, $rootScope, UserService) {

    $scope.logout= function() {
        UserService.logout().then(function(result) {
            $location.path('/login');
            $rootScope.loggedIn = false;
        });
    }

}

angular.module("myApp").controller("NavigationBarController", NavigationBarController);