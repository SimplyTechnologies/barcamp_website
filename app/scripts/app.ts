/// <reference path="references.ts"/>

(function () {

  var app = angular.module('barcamp', [
    'ngRoute',
    'ui.router',
    'mgcrea.ngStrap',
    'ngMap',
    'pascalprecht.translate'
  ]);

  //Controllers
  app.controller('MainController', barcamp.MainController);
  app.controller('HomePageCtrl', barcamp.HomeController);
  app.controller('FaqCtrl', barcamp.FaqController);
  app.controller('ArchiveCtrl', barcamp.ArchiveController);


  //Services
  app.service('Faq', barcamp.FaqService);
  app.service('Speaker', barcamp.SpeakerService);
  app.service('UrlStorage', barcamp.UrlStorageService);

  //Directives

  //Filters

  //Values

  //Interceptor

  // Provders
  app.provider('$appLocale', barcamp.AppLocaleProvider);


  app.config(['$stateProvider', '$urlRouterProvider', '$appLocaleProvider',
    function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $appLocaleProvider: barcamp.IAppLocaleProvider) {
      $appLocaleProvider.initTranslations();

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
      })
      .state('about', {
            url: '/about',
            templateUrl: '/build/views/about.html'
            //controller: 'FaqCtrl',
            //controllerAs: 'faq'
      });


      $urlRouterProvider.otherwise('/home');
    }]);
})();
