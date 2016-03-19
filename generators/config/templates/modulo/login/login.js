(function() {
  'use strict';

  angular.module('coreApp.login', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'modules/login/login.html',
      controller: 'LoginController'
    });
  }])

  .controller('LoginController', ['$http', '$window', 'LoginData', '$scope', function($http, $window, LoginData, $scope) {
    var vm = this;
    vm.loginData = LoginData;
    vm.message = '';
    vm.error = '';


    //this is used to parse the profile
    var url_base64_decode = function(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output); //polyfill https://github.com/davidchambers/Base64.js
    };


    this.submit = function() {
      $http
        .post('/usuario/login', vm.loginData.usuario)
        .success(function(pToken) {
          $window.sessionStorage.token = pToken;
          var encodedProfile = pToken.split('.')[1];

          vm.loginData.bAutenticado = true;
          vm.loginData.profile = JSON.parse(url_base64_decode(encodedProfile));

          $scope.$emit('carregarMenu');
          $window.location = '#/home';
        })
        .error(function() {
          // Erase the token if the usuario fails to log in
          delete $window.sessionStorage.token;
          vm.loginData.bAutenticado = false;

          // Handle login errors here
          vm.error = 'Error: usuário e senha inválidos';
        });
    };

    this.logout = function() {
      vm.error = '';
      vm.message = '';
      vm.loginData.bAutenticado = false;
      vm.loginData.usuario = {};
      vm.loginData.profile = {};
      delete $window.sessionStorage.token;
    };

  }]);

})();
