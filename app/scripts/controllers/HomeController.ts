/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {

    }

    export interface IHomeController {
        init(): void;
    }

    export class HomeController implements IHomeController {
        public scope: barcamp.IHomeControllerScope;

        constructor($scope: barcamp.IHomeControllerScope) {
            this.scope = $scope;
            this.init();
        }

        init(): void {
        }
    }
}

