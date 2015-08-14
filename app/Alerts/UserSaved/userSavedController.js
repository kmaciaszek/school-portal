/* global angular */


function userSavedController ($rootScope, $scope, $modal, $modalInstance) {
    'use strict';

    $scope.ok = function () {
        $modalInstance.close();
    };

}


angular.module('myApp').controller('userSavedController', userSavedController);