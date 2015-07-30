/* global angular */

function LoginController ($q, $rootScope, $scope, $location) {
    'use strict';

    $scope.login = function(user, password) {
        alert('User: ' + user + ', password = ' + password);
    }
}

angular.module('myApp').controller('LoginController', LoginController);
