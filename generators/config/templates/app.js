(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('coreApp', [
    'angular-loading-bar',
    'ngRoute',
    'ngResource',
    'coreApp.dashboard',
    'coreApp.form',
    'coreApp.projeto',
    'coreApp.fragmento'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/projeto',
        controller: 'appCtrl'
      });
  }])

  .controller('appCtrl', ['$scope', function($scope) {
    $scope.painel = {
      titulo: 'IASK'
    };

  }]);

})();
