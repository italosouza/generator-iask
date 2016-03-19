(function() {
  'use strict';

    angular.module('coreApp')

    .service('CoreService', ['$resource', 'MENSAGENS', function($resource, MENSAGENS) {
      var vm = this;

      function limparMensagem() {
        return {
          code: 0,
          texto: '',
          classe: ''
        };
      }

      vm.name = '';
      vm.data = {
        result: [],
        itemSelecionado: null,
        mensagem: limparMensagem()
      };


      vm.setServiceName = function(name) {
          vm.name = name;
      };

      vm.consultar = function() {
        if (!vm.name) {
          console.error('Consultar: Nome do serviço não foi definido.');
          return;
        }

        var service = $resource('/' + vm.name + '/:id');
        return service.query(
          function(pLista) {
            vm.data.result =  pLista;
            vm.data.mensagem = limparMensagem();
            vm.data.itemSelecionado = null;
          },
          function(error){
            vm.data.mensagem.texto =  MENSAGENS.av_NaoFoiPossivelConsultar;
            vm.data.mensagem.classe = MENSAGENS.corErro;
            vm.data.mensagem.error = error;
          });
      };

      vm.buscar = function(pItem) {
        if (!vm.name) {
          console.error('Buscar: Nome do serviço não foi definido.');
          return;
        }

        if (pItem._id) {
          var service = $resource('/' + vm.name + '/:id');
          service.get({
            id: pItem._id
          },
          function(pItem) {
            vm.data.itemSelecionado = pItem;
            vm.data.mensagem = limparMensagem();
          },
          function(error) {
            vm.data.mensagem.texto =  MENSAGENS.av_NaoFoiPossivelConsultar;
            vm.data.mensagem.classe = MENSAGENS.corErro;
            vm.data.mensagem.error = error;
            console.error(error);
          });
        }
      };

      vm.initCadastro = function() {
        var Service = $resource('/' + vm.name + '/:id');
        vm.data.itemSelecionado = new Service();
      };

      vm.salvar = function(pItem) {
        if (!vm.name) {
          console.error('Salvar: Nome do serviço não foi definido.');
          return;
        }

        pItem.$save()
          .then(function() {
            vm.data.mensagem.texto =  MENSAGENS.av_SalvoComSucesso;
            vm.data.mensagem.classe = MENSAGENS.corAviso;
            vm.data.itemSelecionado = pItem;

          })
          .catch(function(error) {
            vm.data.mensagem.texto =  MENSAGENS.av_NaoFoiPossivelSalvar;
            vm.data.mensagem.classe = MENSAGENS.corErro;
            vm.data.mensagem.error = error;
            console.table(error);
          });
      };

      vm.remover = function(pItem) {
        if (!vm.name) {
          console.error('Remover: Nome do serviço não foi definido.');
          return;
        }

        var service = $resource('/' + vm.name + '/:id');

        service.delete({
          id: pItem._id
        },
        vm.consultar,
        function(error){
          vm.data.mensagem.texto =  MENSAGENS.av_NaoFoiPossivelRemover;
          vm.data.mensagem.classe = MENSAGENS.corErro;
          vm.data.mensagem.error = error;
          console.table(error);
        });
      };

      return vm;

    }]);


})();
