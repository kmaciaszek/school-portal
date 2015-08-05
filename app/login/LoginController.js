/* global angular */

function LoginController ($q, $rootScope, $scope, $location, $http) {
    'use strict';

    $scope.login = function(username, password) {
        //alert('User: ' + user + ', password = ' + password);
        var passwordEncrypted = CryptoJS.SHA256(password).toString();
        console.log(passwordEncrypted);
        var credentials = {};
        credentials.username = username;
        credentials.password = passwordEncrypted;
        $http.post('http://localhost:3000/api/login', credentials).then(function(response) {
            $rootScope.loggedIn = true;
            $location.path("/view1");
        }, function(error) {
            console.log(error);
        });
    }
}

angular.module('myApp').controller('LoginController', LoginController);
