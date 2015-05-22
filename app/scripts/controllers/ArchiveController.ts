module barcamp {

  export interface  IArchiveControllerScope extends ng.IScope {

  }

  export interface IArchiveController {
    init(): void;
  }

  export class ArchiveController implements IArchiveController {
    public scope: barcamp.IArchiveControllerScope;

    constructor($scope: barcamp.IArchiveControllerScope) {
      this.scope = $scope;
      this.init();
    }

    init(): void {
    }
  }
}
