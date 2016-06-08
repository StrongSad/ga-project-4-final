var app = angular.module('TripBuddiesApp', ['ui.router', 'TripCtrls']);

app.config([
  '$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/trips.html',
    controller: 'HomeCtrl'
  })
  .state('newTrip', {
    url: '/trips/new',
    templateUrl: 'app/views/newTrip.html',
    controller: 'NewCtrls'
  })
  .state('showTrip', {
    url: '/trips/:id',
    templateUrl: 'app/views/showTrip.html',
    controller: 'ShowCtrls'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/signup',
    controller: 'SignupCtrls'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/login',
    controller: 'LoginCtrls'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'app/views/about',
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  })
  

  $locationProvider.html5Mode(true);
}])