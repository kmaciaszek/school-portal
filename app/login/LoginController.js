/* global angular */

function LoginController ($rootScope, $scope, $location, $http) {
    'use strict';

    var credentials = {};
    $scope.credentials = credentials;

    $scope.login = function(username, password) {
        //alert('User: ' + user + ', password = ' + password);
        var passwordEncrypted = CryptoJS.SHA256(password).toString();
        console.log(passwordEncrypted);
        var credentials = {};
        credentials.username = username;
        credentials.password = passwordEncrypted;
        $http.post('http://localhost:3000/api/login', credentials).then(function(response) {
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


angular.module('myApp').controller('LoginController', LoginController);
