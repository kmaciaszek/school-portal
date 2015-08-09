/* global angular */

function LoginController ($rootScope, $scope, $location, $http, UserService) {
    'use strict';

    var credentials = {};
    $scope.credentials = credentials;

    $scope.login = function(username, password) {
        UserService.loginUser(username, password);
    }


}


angular.module('myApp').controller('LoginController', LoginController);
