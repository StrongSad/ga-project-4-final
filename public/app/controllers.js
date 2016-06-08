

angular.module('TripCtrls', ['TripServices'])


.controller('HomeCtrl', ['$scope', 'Trip', function($scope, Trip){
  $scope.trips = [];

  Trip.query(function success(data) {
    $scope.trips = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deleteTrip = function(id, tripsIdx) {
    Trip.delete({id: id}, function success(data) {
      $scope.trips.splice(tripsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])



/** **********************************************
                  This Is Auth Stuff
********************************************** **/

.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  console.log('in the signup')
  $scope.user = {
    firsName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  };
  $scope.userSignup = function() {
    console.log('about to post')
    $http.post('/api/users', $scope.user).then(function success(res) {
      console.log('success send to home')
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}])
// .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
//   $scope.user = {
//     email: '',
//     password: ''
//   };
//   $scope.userLogin = function() {
//     $http.post('/api/auth', $scope.user).then(function success(res) {
//       Auth.saveToken(res.data.token);
//       console.log('Token:', res.data.token)
//       $location.path('/');
//     }, function error(res) {
//       console.log(data);
//     });
//   }
// }])