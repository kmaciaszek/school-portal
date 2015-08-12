/* global angular */

function UserService ($rootScope, $location, $http) {
    'use strict';
    var loggedInUser;

    function loginUser(username, password) {
        var passwordEncrypted = encryptPassword(password);
        var credentials = {};
        credentials.username = username;
        credentials.password = passwordEncrypted;
        return $http.post(settings.location.user.login, credentials).then(function(response) {
            console.log(response);
            loggedInUser = response.data;
            $rootScope.loggedIn = true;
            return response;
        }, function(error, response) {
            $rootScope.loggedIn = false;
            loggedInUser = null;
            console.log(error);
            return error;
        });
    }

    function encryptPassword(password) {
        return CryptoJS.SHA256(password).toString();
    }

    function logout() {
        return $http.post(settings.location.user.logout).then(function(response) {
            loggedInUser = null;
            if (response.status === 200) {
                return true;
            }
            return false;
        }, function(error, response) {
            loggedInUser = null;
            return false;
        });
    }

    function getAllRoles() {
        return $http.post(settings.location.role.all).then(function(response) {
            return response.data;
        }, function(error, response) {
            console.log(error);
        });
    }
    function getAllUsers() {
        return $http.post(settings.location.user.all).then(function(response) {
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

    function getLoggedInUser() {
        return loggedInUser;
    }
    return {
        loginUser: loginUser,
        logout: logout,
        loggedInUser: getLoggedInUser,
        getAllRoles: getAllRoles,
        saveUser: saveUser,
        getAllUsers: getAllUsers
    }
}

angular.module('myApp.services').factory('UserService', UserService);
