
function UserService ($rootScope, $scope, $location, $http, settings) {
    'use strict';

    function loginUser(username, password) {
            var passwordEncrypted = CryptoJS.SHA256(password).toString();
            var credentials = {};
            credentials.username = username;
            credentials.password = passwordEncrypted;
            $http.post(settings.location.login, credentials).then(function(response) {
                $rootScope.loggedIn = true;
                $scope.unauthorized = false;
                $location.path("/view1");
            }, function(error, response) {
                $rootScope.loggedIn = false;
                $scope.unauthorized = true;
                console.log(error);
            });
    }
}

module.exports = angular.module('myApp.services').factory('UserService', UserService);
