(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'angular-loading-bar',
    'ngRoute',
    'ngResource'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/',
        controller: 'appCtrl'
      });
  }])

  .controller('appCtrl', ['$scope', function($scope) {
    $scope.painel = {
      titulo: 'IASK'
    };

  }]);

})();
