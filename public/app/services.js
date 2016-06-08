angular.module('TripServices', ['ngResource'])
.factory('Trips', ['$resource', function($resource) {
  return $resource('/api/trips/:id');
}]);