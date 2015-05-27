module barcamp {

  export interface  IFaqControllerScope extends ng.IScope {
    name: string;
    email: string;
    text: string;
    success: number;
    questionForm: any;
  }

  export interface IFaqController {
    init(): void;
    send(): void;
  }

  export class FaqController implements IFaqController {
    public scope: barcamp.IFaqControllerScope;
    public FaqService: barcamp.IFaqService;

    constructor($scope: barcamp.IFaqControllerScope, Faq:barcamp.IFaqService) {
      this.scope = $scope;
      this.FaqService = Faq;
      this.init();
    }

    init(): void {
    }

    send(): void {
      this.scope.success = -1;
      this.FaqService.send(this.scope.name, this.scope.email, this.scope.text)
        .then((argument) => {
          this.scope.name = '';
          this.scope.email = '';
          this.scope.text = '';
          this.scope.questionForm.$setPristine();
          this.scope.success = 1;
        })
        .catch((argument) => {
          this.scope.success = 0;
        });
    }
  }
}
