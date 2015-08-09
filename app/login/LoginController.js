/* global angular */

function LoginController ($q, $rootScope, $scope, $location, $http) {
    'use strict';

    $scope.ver1 = function() {
        var x = document.getElementById("user");
        if (x.value.length < 3) {
            $rootScope.wrong1 = true;
        } else {
            $rootScope.wrong1 = false;
        }
    }
        $scope.ver2 = function(){
            var x = document.getElementById("password");
            if (x.value.length < 4) {
                $rootScope.wrong2 = true;
            } else {
                $rootScope.wrong2 = false;
            }
    }

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
        }, function(error, response) {
            $rootScope.unauthorized = true;
            console.log(error);
        });
    }



}


angular.module('myApp').controller('LoginController', LoginController);
