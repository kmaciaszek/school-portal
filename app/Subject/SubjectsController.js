/* global angular */

function SubjectsController($scope, $location, $http) {

    $scope.subjects = [];

    loadSubjects();

    function loadSubjects() {
        return $http({
            method: 'get',
            url: 'http://localhost:3000/api/subjects'
        }).then(function (response) {
            $scope.subjects = response.data; // cache package registrations
            //return response.data;
        });
    }

}

angular.module("myApp").controller("SubjectsController", SubjectsController);