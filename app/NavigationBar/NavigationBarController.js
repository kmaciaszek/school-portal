/* global angular */

function NavigationBarController($scope, $location, $rootScope) {

    $scope.logout= function(){
        $location.path('/logout');
        $rootScope.loggedIn = false;
    }

}

angular.module("myApp").controller("NavigationBarController", NavigationBarController);