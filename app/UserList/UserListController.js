/* global angular */

function UserListController ($q, $rootScope, $scope, $location, $http, UserService, DTOptionsBuilder, DTColumnBuilder, $modal, $timeout) {
    'use strict';
    $scope.userAddedMessage = false;
    var self = $scope;
    self.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
        var defer = $q.defer();
        defer.resolve(UserService.getAllUsers());
        return defer.promise;
    }).withPaginationType('full_numbers');
    self.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('first_name').withTitle('First name'),
        DTColumnBuilder.newColumn('last_name').withTitle('Last name'),
        DTColumnBuilder.newColumn('email').withTitle('Email')
    ];

    self.reloadData = reloadData;
    self.dtInstance = {};

    function reloadData() {
        self.dtInstance.reloadData(reloadCallback, true);
    }

    function reloadCallback(data) {
        console.log(data);
    }

    $scope.showCreateUser = function () {
        $modal.open({
            templateUrl: 'User/createUser.html',
            controller: CreateUserController,
            windowClass: 'app-modal-window',
            size: 'customSize'
        }).result.then(function(result) {
                reloadData();
                $scope.userAddedMessage = true;
                $timeout(function () { $scope.userAddedMessage = false; }, 5000);


            });

    };


}
angular.module('myApp').controller('UserListController', UserListController);