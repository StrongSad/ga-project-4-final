

angular.module('TripServices', ['ngResource'])


.factory('Trip', ['$resource', function($resource) {
  return $resource('/api/trips/:id');
}])



/** **********************************************
                    This Is Auth Stuff
********************************************** **/

.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secrets-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secrets-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secrets-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload;
        } catch(err) {
          return false;
        }
      }
    }
  }
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])
