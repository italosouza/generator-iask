(function() {
  'use strict';

  angular.module('coreApp.<%= generatorName %>', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/<%= generatorName %>', {
        templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>_con.html',
        controller: '<%= generatorModel %>Controller'
      })
      .when('/<%= generatorName %>/edit', {
        templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>_cad.html',
        controller: '<%= generatorModel %>Controller'
      })
      .when('/<%= generatorName %>/edit/:id', {
        templateUrl: 'modules/<%= generatorName %>/<%= generatorName %>_cad.html',
        controller: '<%= generatorModel %>Controller'
      });
  }])

  //define o service do modulo
  .factory('<%= generatorModel %>Service', ['$resource', function($resource) {
    return $resource('/<%= generatorName %>/:id');
  }])

  //define a controller do modulo
  .controller('<%= generatorModel %>Controller', ['$scope', '$routeParams', '<%= generatorModel %>Service', function($scope, $routeParams, <%= generatorModel %>Service) {

    $scope.lista = [];
    $scope.titulo = 'IASK';
    $scope.mensagem = {
      texto: ''
    };

    //setup inicial do objeto (editar/cadastrar)
    if ($routeParams.id) {

      <%= generatorModel %>Service.get({
          id: $routeParams.id
        },
        function( <%= generatorName %> ) {
          $scope.<%= generatorName %> = <%= generatorName %> ;
        },
        function(error) {
          $scope.mensagem = {
            texto: '<%= generatorModel %>Service não existe.'
          };
          console.error(error);
        });

    } else {
      $scope. <%= generatorName %> = new <%= generatorModel %>Service();
    }

    $scope.salvar = function() {
      $scope.<%= generatorName %>.$save()
        .then(function() {
          // console.log('Salvo', obj);
          $scope.mensagem = {
            texto: 'Salvo com sucesso'
          };
          $scope.<%= generatorName %> = new <%= generatorModel %>Service();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível salvar',
            error: erro
          };
        });
    };

    function buscar() { <%= generatorModel %>Service.query(
        function( <%= generatorName %> ) {
          $scope.lista = <%= generatorName %>;
        },
        function(error) {
          console.error('Não foi possível obter a lista de <%= generatorName %>');
          console.table(error);
        });
    }

    $scope.listar = function() {
      buscar();
    };

    $scope.remover = function( <%= generatorName %> ) { <%= generatorModel %>Service.delete({
          id: <%= generatorName %>._id
        },
        buscar,
        function(error) {
          console.error('Não foi possível obter a lista de <%= generatorName %>');
          console.table(error);
        });
    };

  }]);

})();
