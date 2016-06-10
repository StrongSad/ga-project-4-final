var app = angular.module('RecipeApp', ['ui.router', 'TripCtrls']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/trips.html',
    controller: 'HomeCtrl'
  })
  .state('newTrip', {
    url: '/trips/new',
    templateUrl: 'app/views/newTrip.html',
    controller: 'NewCtrl'
  })
  .state('tripShow', {
    url: '/trips/:id',
    templateUrl: 'app/views/showTrip.html',
    controller: 'ShowCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'app/views/about.html'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])