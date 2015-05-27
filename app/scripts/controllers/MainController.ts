/// <reference path="../references.ts"/>

module barcamp {

  export interface  IMainControllerScope extends ng.IScope {
    changeLang(lang: string): void;
  }

  export interface IMainController {
  }

  export class MainController implements IMainController {
    public rootScope: any;
    public scope: barcamp.IMainControllerScope;
    private appLocale: barcamp.IAppLocaleService;
    private translate: any;


    constructor($scope:barcamp.IMainControllerScope, $appLocale: barcamp.IAppLocaleService, $rootScope: any, $translate: any) {
      this.rootScope = $rootScope;
      this.scope = $scope;
      this.appLocale = $appLocale;
      this.translate = $translate;
      this.rootScope.currentLang = this.translate.proposedLanguage() || this.translate.use();
    }

    changeLang(lang: string) : void {
      this.appLocale.changeLocale(lang);
      this.rootScope.currentLang = lang;
    }
  }
}

