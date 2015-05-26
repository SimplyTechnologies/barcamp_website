/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {
        daysLeft: number;
        speakers: any;
        currentLang: string;
    }

    export interface IHomeController {
        init(): void;
    }

    export class HomeController implements IHomeController {
        public scope:barcamp.IHomeControllerScope;
        private speakerService:barcamp.ISpeakerService;
        private translate: any;

        constructor($scope:barcamp.IHomeControllerScope,
                    $translate: any,
                    Speaker:barcamp.ISpeakerService) {
            this.scope = $scope;
            this.speakerService = Speaker;
            this.translate = $translate;
            this.scope.currentLang = this.translate.proposedLanguage() || this.translate.use();
            this.init();
        }

        init():void {
            var endDay:number = new Date(2015, 5, 30).getDate();
            var today:number = new Date().getDate();

            this.speakerService.get()
                .then((speakers: any) => {
                    speakers = speakers.data;
                    this.scope.speakers = speakers;
                });

            this.scope.daysLeft = endDay - today;
        }

    }
}

