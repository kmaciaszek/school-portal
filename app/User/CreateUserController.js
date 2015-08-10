/* global angular */

function CreateUserController ($rootScope, $scope, $location, $http, UserService) {
    'use strict';

    $scope.createUser = function() {
        alert('create user called.');
    }

}

angular.module('myApp').controller('CreateUserController', CreateUserController);