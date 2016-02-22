(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'ngMaterial',
    'angular-loading-bar',
    'ngRoute',
    'ngResource',
    'coreApp.navegacao'
  ])

  .constant('MENSAGENS', {
    corNormal: 'md-primary',
    corAviso: 'md-primary md-hue-1',
    corErro: 'md-warn'
  })

  .config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/navegacao'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');

  }])

  .controller('appCtrl', ['$scope', '$mdSidenav', '$location', 'NavegacaoService', function($scope, $mdSidenav, $location, NavegacaoService) {
    $scope.painel = {
      titulo: 'IASK'
    };
    $scope.menuSelecionado = null;

    $scope.listaMenu = NavegacaoService.query();

    $scope.selecionarItemMenu = function(pItemMenu) {
      $scope.menuSelecionado = pItemMenu;
      $location.path('/' + pItemMenu.rota);
    };

    $scope.toggleMenu = function() {
      $mdSidenav('left').toggle();
    };

  }]);

})();
