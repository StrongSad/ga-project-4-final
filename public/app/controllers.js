angular.module('TripCtrls', ['TripServices'])


.controller('HomeCtrl', ['$scope', 'Trip', function($scope, Trip) {
  $scope.trips = [];

  Trip.query(function success(data) {
    $scope.trips = data;
  }, function error(data) {
    console.log(data);
  });

  //if you are the user who created the trip then you can delete/remove the trip
  // else you cannot delete the trip

  $scope.deleteTrip = function(id, tripsIdx) {
    Trip.delete({id: id}, function success(data) {
      $scope.trips.splice(tripsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('NewCtrl', ['$scope', '$location', 'Trip', function($scope, $location, Trip) {
  $scope.trip = {
    userLocation: '',
    userDestination: '',
    startDate: '',
    endDate: '',
    seatsAvailable: '',
    description: '',
    messages: []
  };

  $scope.createTrip = function() {
    Trip.save($scope.trip, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('ShowCtrl', ['$scope', '$stateParams', 'Trip', '$http', function($scope, $stateParams, Trip, $http) {
  $scope.trip = {};
  $scope.message = {};

  Trip.get({id: $stateParams.id}, function success(data) {
    $scope.trip = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.createPost = function() {
    console.log($scope.message)
    $http({url: '/api/trips/' + $scope.trip._id + '/messages', data:$scope.message, method:'POST'}).then(function success(data) {
      $scope.trip.messages.push($scope.message)
      $scope.message={}
      console.log(data)
    }, function error(data) {
      console.log(data)
    })
  }
}])

.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    username: '',
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token)
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}]);
