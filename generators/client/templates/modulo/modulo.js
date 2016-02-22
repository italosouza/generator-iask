(function() {
  'use strict';

  angular.module('coreApp.<%= generatorName %>', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/<%= generatorName %>', {
        templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>.html',
        controller: '<%= generatorModel %>Controller'
      })
      .when('/<%= generatorName %>/edit', {
        templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>.html',
        controller: '<%= generatorModel %>Controller'
      })
      .when('/<%= generatorName %>/edit/:id', {
        templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>.html',
        controller: '<%= generatorModel %>Controller'
      });
  }])

  //define o service do modulo
  .factory('<%= generatorModel %>Service', ['$resource', function($resource) {
    return $resource('/<%= generatorName %>/:id');
  }])

  //define a controller do modulo
  .controller('<%= generatorModel %>Controller', ['$scope', '$routeParams', '<%= generatorModel %>Service', '$mdDialog', 'MENSAGENS', function($scope, $routeParams, <%= generatorModel %>Service, $mdDialog, MENSAGENS) {
    var bItemSelecionado = false;
    $scope.itemSelecionado = null;
    $scope.tabs = {
      selectedIndex: 0
    };

    $scope.lista = [];
    $scope.mensagem = {
      classe: MENSAGENS.corNormal,
      texto: ''
    };

    $scope.selecionarItemCadastro = function(pItem) {
      $scope.buscar(pItem);

      $scope.itemSelecionado = 1;
      bItemSelecionado = true;
      $scope.tabs.selectedIndex = 1;
    };

    $scope.$watch('tabs.selectedIndex', function(current) {
      $scope.mensagem = {
        classe: MENSAGENS.corNormal,
        texto: ''
      };

      if (!bItemSelecionado && current === 1) {
        $scope.itemSelecionado = new <%= generatorModel %>Service();
      } else if (current === 0) {
        $scope.listar();
      }
      bItemSelecionado = false;
    });

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
          $scope.remover(pItem);
        }, function() {
          $scope.mensagem = {
            texto: '',
            status: 'nok',
            obj: pItem
          };
        });

    };

    $scope.buscar = function(pItem) {
      if (pItem._id) { <%= generatorModel %>Service.get({
            id: pItem._id
          },
          function(pItem) {
            $scope.itemSelecionado = pItem;
          },
          function(error) {
            $scope.mensagem = {
              texto: 'Navegação não existe.'
            };
            console.error(error);
          });

      }
    };

    $scope.salvar = function() {
      $scope.itemSelecionado.$save()
        .then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso',
            classe: MENSAGENS.corAviso
          };
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível salvar',
            classe: MENSAGENS.corErro,
            error: erro
          };
          console.table(erro);
        });
    };

    $scope.listar = function() { <%= generatorModel %>Service.query(
        function(pLista) {
          $scope.lista = pLista;
        },
        function(error) {
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista de registros',
            classe: MENSAGENS.corErro,
            error: error
          };
          console.table(error);
        });
    };

    $scope.remover = function(pItem) { <%= generatorModel %>Service.delete({
          id: pItem._id
        },
        $scope.listar,
        function(error) {
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista de registros',
            classe: MENSAGENS.corErro,
            error: error
          };
          console.table(error);
        });
    };

  }]);

})();
