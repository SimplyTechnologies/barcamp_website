module barcamp {

  export interface  ITimetableControllerScope extends ng.IScope {

  }

  export interface ITimetableController {
    init(): void;
  }

  export class TimetableController implements ITimetableController {
    public scope: barcamp.ITimetableControllerScope;

    constructor($scope: barcamp.ITimetableControllerScope) {
      this.scope = $scope;
      this.init();
    }

    init(): void {
    }
  }
}
