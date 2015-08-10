/* global angular */

function UserService ($rootScope, $location, $http) {
    'use strict';

    function loginUser(username, password) {
            var passwordEncrypted = encryptPassword(password);
            var credentials = {};
            credentials.username = username;
            credentials.password = passwordEncrypted;
            $http.post(settings.location.login, credentials).then(function(response) {
                $rootScope.loggedIn = true;
                $location.path("/view1");
            }, function(error, response) {
                $rootScope.loggedIn = false;
                console.log(error);
            });
    }

    function encryptPassword(password) {
        return CryptoJS.SHA256(password).toString();
    }

    function getAllRoles() {
        return $http.post(settings.location.role.all).then(function(response) {
            return response.data;
        }, function(error, response) {
            console.log(error);
        });
    }

    function saveUser(user) {
        user.password = encryptPassword(user.password);
        return $http.post(settings.location.user.save, user).then(function(response) {
            return response.data;
        }, function(error, response) {
            console.log(error);
        });
    }

    return {
        loginUser: loginUser,
        getAllRoles: getAllRoles,
        saveUser: saveUser
    }
}

angular.module('myApp.services').factory('UserService', UserService);
