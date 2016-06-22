
var socket = io.connect();
var board_module = angular.module('board_app', ['ngRoute'])
////////////////////////////////////////////////login controller////////////////////////////////////////////////

////////////////////////////////////////////////routes provider////////////////////////////////////////////////

board_module.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html'
        })
        .when('/dashboard',{
            templateUrl: 'partials/dashboard.html'
        })
        .when('/topic/:id',{
            templateUrl: 'partials/topic.html'
        })
        .when('/user/:id',{
            templateUrl: 'partials/user.html'
        })
        .when('/user',{
            templateUrl: 'partials/user.html'
        })
        .when('/logout',{
            templateUrl: 'partials/login.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
