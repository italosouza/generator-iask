//https://gist.github.com/brucecoddington/92a8d4b92478573d0f42

(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'ngMaterial',
    'angular-loading-bar',
    'ngRoute',
    'ngResource',
    'coreApp.login',
    'coreApp.navegacao',
    'coreApp.usuario'
  ])

  //todo: refatorar em modulo de constantes
  .constant('MENSAGENS', {
    corNormal: 'md-primary',
    corAviso: 'md-primary md-hue-1',
    corErro: 'md-warn',

    av_NaoFoiPossivelConsultar: 'Não foi possível realizar a consulta.',
    av_SalvoComSucesso: 'Salvo com sucesso.',
    av_NaoFoiPossivelSalvar: 'Não foi possível salvar.',
    av_NaoFoiPossivelRemover: 'Não foi possível remover este registro.'
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

  .factory('LoginData', function() {
    return {
      usuario: {
        nome: '',
        senha: ''
      },
      bAutenticado: false
    };
  })

  .controller('appCtrl', ['$scope', '$mdSidenav', '$location', 'NavegacaoService', '$window', 'LoginData', function($scope, $mdSidenav, $location, NavegacaoService, $window, LoginData) {
    $scope.painel = {
      titulo: 'IASK'
    };
    $scope.menuSelecionado = null;
    $scope.loginData = LoginData;
    NavegacaoService.setServiceName('navegacao');

    var carregarMenu = function() {
      $scope.listaMenu = NavegacaoService.consultar();
    };

    $scope.loginData.bAutenticado = $window.sessionStorage.token || false;
    if ($scope.loginData.bAutenticado) {
      carregarMenu();
    }

    $scope.selecionarItemMenu = function(pItemMenu) {
      $scope.menuSelecionado = pItemMenu;
      $location.path('/' + pItemMenu.rota);
    };

    $scope.toggleMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.$on('carregarMenu', carregarMenu);

  }])

  .directive('loadingOverlayIndicator', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'E',
      template: "<div id='overlay' ng-show='loginData.bAutenticado && isRouteLoading'></div>",
      replace: true,
      link: function(scope) {

        scope.isRouteLoading = false;

        $rootScope.$on('cfpLoadingBar:started', function() {
          scope.isRouteLoading = true;
        });

        $rootScope.$on('cfpLoadingBar:completed', function() {
          var completeTimeout;

          $timeout.cancel(completeTimeout);
          completeTimeout = $timeout(function() {
            scope.isRouteLoading = false;
          }, 500);

        });
      }
    };

  }]);

})();
