(function() {
  'use strict';

    angular.module('coreApp.usuario', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/usuario', {
          templateUrl: 'modules/usuario/usuario.html',
          controller: 'UsuarioController'
        });
    }])

    //define o service do modulo
    .service('UsuarioService', ['CoreService', function(CoreService) {
      return angular.extend(this, CoreService);
    }])

    .controller('UsuarioController', ['$scope', '$mdDialog', 'UsuarioService', function($scope, $mdDialog, UsuarioService) {

      //init
      UsuarioService.setServiceName('usuario');

      //bindings
      $scope.data = UsuarioService.data;

      var bItemSelecionado = false;
      $scope.tabs = {
        selectedIndex: 0
      };

      $scope.selecionarItemCadastro = function(pItem) {
        $scope.data.itemSelecionado = pItem;
        bItemSelecionado = true;
        $scope.tabs.selectedIndex = 1;
      };

      $scope.$watch('tabs.selectedIndex', function(current) {
        if (current === 0) {
          UsuarioService.consultar();
        } else if (!bItemSelecionado && current === 1) {
          UsuarioService.initCadastro();
        }

        bItemSelecionado = false;
      });


      //todo: refatorar em coreFactory
      $scope.removerItemCadastro = function(pItem, pEvent) {
        var confirm = $mdDialog.confirm()
          .title('Deseja remover este registro?')
          .textContent('Ao confirmar esta operação o registro será removido e não será possível recuperá-lo.')
          .ariaLabel('Remover')
          .targetEvent(pEvent)
          .ok('SIM')
          .cancel('NÃO');

        $mdDialog.show(confirm)
          .then(function() {
            UsuarioService.remover(pItem);
          });
      };


      //core behavior
      $scope.salvar = function() {
        UsuarioService.salvar($scope.data.itemSelecionado);
      };


    }]);


})();
