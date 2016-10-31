var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'MainController'
  });
  $locationProvider.html5Mode(true);
}]);
