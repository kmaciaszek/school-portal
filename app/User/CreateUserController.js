/* global angular */

function CreateUserController ($rootScope, $scope, $location, $http, UserService, $modal, $modalInstance) {
    'use strict';

    UserService.getAllRoles().then(function(roles) {
        $scope.roles = roles;
    });

    $scope.createUser = function() {
        var user = $scope.userData;
        console.log(user);
        UserService.saveUser(user).then(function(user) {
            $modalInstance.close();
        },function(err) {
            console.log(err);
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

angular.module('myApp').controller('CreateUserController', CreateUserController);