/// <reference path="../references.ts"/>

module barcamp {

  export interface  IMainControllerScope extends ng.IScope {
    changeLang(lang: string): void;
    getLang(): string;
  }

  export interface IMainController {
  }

  export class MainController implements IMainController {
    public scope: barcamp.IMainControllerScope;
    private appLocale: barcamp.IAppLocaleService;

    constructor($scope:barcamp.IMainControllerScope, $appLocale: barcamp.IAppLocaleService) {
      this.scope = $scope;
      this.appLocale = $appLocale;
    }

    changeLang(lang: string) : void {
      this.appLocale.changeLocale(lang);
    }

    getLang() : string {
      return this.appLocale.getLocale();
    }
  }
}

