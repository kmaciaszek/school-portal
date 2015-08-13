/* global angular */


function userSavedController ($rootScope, $scope, $modal, $modalInstance) {
    'use strict';


    $scope.ok = function () {
        $modalInstance.close();
        window.top.location.reload();
    };




}


angular.module('myApp').controller('userSavedController', userSavedController);