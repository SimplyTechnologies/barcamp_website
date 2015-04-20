/// <reference path="references.ts"/>

(function () {

  var app = angular.module('barcamp', [
    'ngRoute',
    'ui.router'
  ]);

  //Controllers
  app.controller('HomePageCtrl', barcamp.HomeController);

  //Services

  //Directives

  //Filters

  //Values

  //Interceptor

  app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/build/views/home.html',
          controller: 'HomePageCtrl',
          controllerAs: 'home'
        });

      $urlRouterProvider.otherwise('/home');

    }]);
})();
