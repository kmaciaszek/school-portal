/* global angular */

function HomeController($rootScope, $scope, $location, $modal) {
  'use strict';

  $scope.modalExample = function() {
    $modal.open({
      templateUrl: 'User/createUser.html',
      controller: CreateUserController
    });
  }

};

angular.module('myApp').controller('HomeController', HomeController);