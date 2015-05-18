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
  app.controller('TimetableCtrl', barcamp.TimetableController);


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

        .state('timetable', {
          url: '/timetable',
          templateUrl: '/build/views/timetable.html',
          controller: 'TimetableCtrl',
          controllerAs: 'timetable'
        })

      .state('faq', {
        url: '/faq',
        templateUrl: '/build/views/faq.html',
        controller: 'FaqCtrl',
        controllerAs: 'faq'
      });



      $urlRouterProvider.otherwise('/home');


    }]);
})();
