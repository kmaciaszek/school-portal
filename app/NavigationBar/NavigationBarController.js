/* global angular */

function NavigationBarController($scope, $location, $rootScope, UserService) {

    $scope.loggedInUser = functUserService.loggedInUser;

    $scope.logout= function() {
        UserService.logout().then(function(result) {
            $location.path('/login');
            $rootScope.loggedIn = false;
        });
    }

}

angular.module("myApp").controller("NavigationBarController", NavigationBarController);