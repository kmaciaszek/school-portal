/* global angular */

function LoginController ($rootScope, $scope, $location, $http, UserService) {
    'use strict';

    var credentials = {};
    $scope.credentials = credentials;

    $scope.login = function(username, password) {
        UserService.loginUser(username, password).then(function(response) {
            if (response.status === 200) {
                $scope.unauthorized = false;
                $location.path("/home");
            } else if (response.status === 401) {
                $scope.unauthorized = true;
            } else {
                alert("An Error Occurred.");
            }
        });
    }


}


angular.module('myApp').controller('LoginController', LoginController);
