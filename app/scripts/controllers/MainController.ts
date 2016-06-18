/// <reference path="../references.ts"/>

module barcamp {

    export interface  IMainControllerScope extends ng.IScope {
        changeLang(lang:string): void;
        daysLeft: number;
    }

    export interface IMainController {
    }

    export class MainController implements IMainController {
        public rootScope:any;
        public scope:barcamp.IMainControllerScope;
        private appLocale:barcamp.IAppLocaleService;
        private translate:any;
        private isDroppedMenu: boolean;
        
        constructor($scope:barcamp.IMainControllerScope, $appLocale:barcamp.IAppLocaleService, $rootScope:any, $translate:any) {
            this.rootScope = $rootScope;
            this.scope = $scope;
            this.appLocale = $appLocale;
            this.isDroppedMenu = false;
            this.translate = $translate;
            this.rootScope.currentLang = this.translate.proposedLanguage() || this.translate.use();
            var endDay:number = new Date(2016, 5, 18).getTime();
            var today:number = new Date().getTime();
            var timeDiff = Math.abs(today - endDay);
            // this.scope.daysLeft = endDay - today;
            this.scope.daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
        }

        changeLang(lang:string):void {
            this.appLocale.changeLocale(lang);
            this.rootScope.currentLang = lang;
        }

        toggleMenu(): void {
            if (this.isDroppedMenu) {
                angular.element('#navbar').removeClass('slideUp');
            } else {
                angular.element('#navbar').addClass('slideUp');
            }

            this.isDroppedMenu = !this.isDroppedMenu;
        }
    }
}

