/* global angular */

function UserListController ($rootScope, $scope, $location, $http, UserService, DTOptionsBuilder, DTColumnBuilder, $modal) {
    'use strict'

    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(UserService.getAllUsers())
        .withPaginationType('full_numbers');
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('first_name').withTitle('First name'),
        DTColumnBuilder.newColumn('last_name').withTitle('Last name'),
        DTColumnBuilder.newColumn('email').withTitle('Email')
    ];


    $scope.modalExample = function () {
        $modal.open({
            templateUrl: 'User/createUser.html',
            controller: CreateUserController,
            windowClass: 'app-modal-window',
            size: 'customSize'
        });
    };


}
angular.module('myApp').controller('UserListController', UserListController);