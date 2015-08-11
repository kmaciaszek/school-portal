'use strict';

// require('less');

// Declare app level module which depends on views, and components
 var app = angular.module('myApp', [
     'ngRoute',
     'myApp.version',
     'myApp.directives',
     'myApp.services'
]);

angular.module('myApp.directives', ['datatables']);
angular.module('myApp.services', []);

app.config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/view1', {
              templateUrl: 'view1/view1.html',
              controller: 'View1Ctrl'
          })
          .when('/view2', {
              templateUrl: 'view2/view2.html',
              controller: 'View2Ctrl'
          })
          .when('/login', {
            templateUrl: 'Login/Login.html',
            controller: 'LoginController'
          })
          .when('/subject', {
              templateUrl: 'Subject/Subjects.html',
              controller: 'SubjectsController'
          })
          .when('/logout', {
              templateUrl: 'Logout/Logout.html',
              controller: 'LogoutController'
          })
          .when('/user/create', {
              templateUrl: 'User/createUser.html',
              controller: 'CreateUserController'
          })
          .when('/UserList/UserList', {
            templateUrl: 'UserList/UserList.html',
            controller: 'UserListController'
           })
          .otherwise({redirectTo: '/view1'});
}]);

app.run(function($rootScope, $location) {
    $rootScope.location = $location;
    $rootScope.loggedIn = false;
    $rootScope.settings = settings;

});