/**
 * Created by Marat on 5/11/2015.
 */
module barcamp {

  export interface  IFaqControllerScope extends ng.IScope {

  }

  export interface IFaqController {
    init(): void;
  }

  export class FaqController implements IFaqController {
    public scope: barcamp.IFaqControllerScope;

    constructor($scope: barcamp.IFaqControllerScope) {
      this.scope = $scope;
      this.init();
    }

    init(): void {
    }
  }
}
