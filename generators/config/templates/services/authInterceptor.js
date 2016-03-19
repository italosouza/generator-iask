(function() {
  'use strict';

  angular.module('coreApp')

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', function($rootScope, $q, $window, $location) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers['x-auth'] = $window.sessionStorage.token;
        } else if (config.url.indexOf('login') === -1)
        {
          $location.path('/login');
        }
        return config;
      },
      responseError: function(rejection) {
        if (rejection.status === 401) {
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  }]);

})();
