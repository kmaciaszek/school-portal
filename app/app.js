'use strict';

// require('less');

// Declare app level module which depends on views, and components
 var app = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'myApp.directives'

]);

angular.module('myApp.directives', []);

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
          .otherwise({redirectTo: '/view1'});
}]);

app.run(function($rootScope, $location) {
    $rootScope.location = $location;
    $rootScope.loggedIn = false;
    $rootScope.unauthorized = false;
    $rootScope.wrong1 = false;
    $rootScope.wrong2 = false;

});