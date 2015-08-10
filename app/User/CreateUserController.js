/* global angular */

function CreateUserController ($rootScope, $scope, $location, $http, UserService) {
    'use strict';

    UserService.getAllRoles().then(function(roles) {
        $scope.roles = roles;
    });

    $scope.createUser = function() {
        var user = $scope.userData;
        console.log(user);
        UserService.saveUser(user).then(function (user) {
            alert('User: ' + user.first_name + ' saved successfully.');
        }, function(err) {
            console.log(err);
        });
    }




}

angular.module('myApp').controller('CreateUserController', CreateUserController);