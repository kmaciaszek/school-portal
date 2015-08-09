/* global angular */

function UserService ($rootScope, $location, $http) {
    'use strict';

    function loginUser(username, password) {
            var passwordEncrypted = CryptoJS.SHA256(password).toString();
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

    return {
        loginUser: loginUser
    }
}

angular.module('myApp.services').factory('UserService', UserService);
