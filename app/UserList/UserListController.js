/* global angular */

function UserListController ($rootScope, $scope, $location, $http, UserService) {
    'use strict'



    $scope.headers = [
        {"order": 1, "width": 90, "label": "ID", "data": "id", "type": "string", "visible": true},
        {"order": 2, "width": 120, "label": "First Name", "data": "first_name", "type": "string", "visible": true},
        {"order": 3, "width": 129, "label": "Last Name", "data": "last_name", "type": "string", "visible": true},
        {"order": 4, "width": 200, "label": "Email Address", "data": "email", "type": "string", "visible": true},
        {"order": 5, "width": 120, "label": "Password", "data": "password", "type": "string", "visible": true},
    ];

    /* UserService.getAllUsers().then(function(users){
     $scope.users=users;
     });*/

   $scope.users = [
        {
            "id": "1",
            "lastName": "Test1",
            "firstName": "Test",
            "email": "test1@example.com",
            "phoneNumber": "(555) 111-0001",

        },
        {
            "id": "2",
            "lastName": "Test2",
            "firstName": "Test",
            "email": "test2@example.com",
            "phoneNumber": "(555) 222-0002",

        },
        {
            "id": "3",
            "lastName": "Test3",
            "firstName": "Test",
            "email": "test3@example.com",
            "phoneNumber": "(555) 333-0003",

        },
        {
            "id": "4",
            "lastName": "Test4",
            "firstName": "Test",
            "email": "test4@example.com",
            "phoneNumber": "(555) 444-0004",

        },
        {
            "id": "5",
            "lastName": "Test5",
            "firstName": "Test",
            "email": "test5@example.com",
            "phoneNumber": "(555) 555-0005",

        }

    ];







}


angular.module('myApp').controller('UserListController', UserListController);