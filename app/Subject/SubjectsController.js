/* global angular */

function SubjectsController($scope, $location, $http) {

    $scope.subjects = [];

    loadSubjects();

    function loadSubjects() {
        return $http({
            method: 'get',
            url: 'http://localhost:3000/api/subjects'
        }).then(function (response) {
            if (response.status === 200) {
                $scope.subjects = response.data;
            } else {

            }

        });
    }

}

angular.module("myApp").controller("SubjectsController", SubjectsController);