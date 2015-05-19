/// <reference path="../references.ts"/>

module barcamp {

  export interface  IHomeControllerScope extends ng.IScope {
    daysLeft: number;
  }

  export interface IHomeController {
    init(): void;
  }

  export class HomeController implements IHomeController {
    public scope:barcamp.IHomeControllerScope;

    constructor($scope:barcamp.IHomeControllerScope) {
      this.scope = $scope;
      this.init();
    }

    init():void {
      var endDay: number = new Date(2015, 5, 30).getDate();
      var today: number = new Date().getDate();

      this.scope.daysLeft = endDay - today;
    }
  }
}

