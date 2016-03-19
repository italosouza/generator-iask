(function() {
  'use strict';

    angular.module('coreApp.<%= generatorName %>', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/<%= generatorName %>', {
          templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>.html',
          controller: '<%= generatorModel %>Controller'
        });
    }])

    //define o service do modulo
    .service('<%= generatorModel %>Service', ['CoreService', function(CoreService) {
      return angular.extend(this, CoreService);
    }])

    .controller('<%= generatorModel %>Controller', ['$scope', '$mdDialog', '<%= generatorModel %>Service', function($scope, $mdDialog, <%= generatorModel %>Service) {

      //init
      <%= generatorModel %>Service.setServiceName('<%= generatorName %>');

      //bindings
      $scope.data = <%= generatorModel %>Service.data;

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
          <%= generatorModel %>Service.consultar();
        } else if (!bItemSelecionado && current === 1) {
          <%= generatorModel %>Service.initCadastro();
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
            <%= generatorModel %>Service.remover(pItem);
          });
      };


      //core behavior
      $scope.salvar = function() {
        <%= generatorModel %>Service.salvar($scope.data.itemSelecionado);
      };


    }]);


})();
