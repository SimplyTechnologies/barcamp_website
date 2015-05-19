/// <reference path="references.ts"/>

(function () {

  var app = angular.module('barcamp', [
    'ngRoute',
    'ui.router',
    'mgcrea.ngStrap',
    'ngMap'
  ]);

  //Controllers
  app.controller('HomePageCtrl', barcamp.HomeController);
  app.controller('FaqCtrl', barcamp.FaqController);
  app.controller('ArchiveCtrl', barcamp.FaqController);


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
        })

      .state('faq', {
        url: '/faq',
        templateUrl: '/build/views/faq.html',
        controller: 'FaqCtrl',
        controllerAs: 'faq'
      })
      .state('archive', {
        url: '/archive',
        templateUrl: '/build/views/archive.html',
        controller: 'ArchiveCtrl',
        controllerAs: 'archive'
      })
      .state('archive.year', {
        url: '/:year',
        views: {
          year: {
            templateUrl: function($stateParams): string {
              return '/build/views/archive_' + $stateParams.year + '.html';
            }
          }
        }
      });

      $urlRouterProvider.otherwise('/home');
    }]);
})();
