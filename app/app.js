'use strict';

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
            templateUrl: 'Login/login.html',
            controller: 'LoginController'
          })
          .otherwise({redirectTo: '/view1'});
}]);