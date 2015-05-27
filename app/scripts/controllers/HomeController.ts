/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {
        daysLeft: number;
        speakers: any;
        currentLang: string;
        keys: any;
    }

    export interface IHomeController {
        init(): void;
    }

    export class HomeController implements IHomeController {
        public scope:barcamp.IHomeControllerScope;
        private speakerService:barcamp.ISpeakerService;
        private scheduleService:barcamp.IScheduleService;
        private translate: any;

        constructor($scope:barcamp.IHomeControllerScope,
                    $translate: any,
                    Speaker:barcamp.ISpeakerService,
                    Schedule:barcamp.IScheduleService) {

            this.scope = $scope;
            this.speakerService = Speaker;
            this.scheduleService = Schedule;
            this.translate = $translate;
            this.scope.currentLang = this.translate.proposedLanguage() || this.translate.use();
            this.scope.keys = Object.keys;
            this.init();
        }

        init():void {
            var endDay:number = new Date(2015, 5, 30).getDate();
            var today:number = new Date().getDate();

            this.speakerService.get()
                .then((speakers: any) => {
                    speakers = speakers.data;
                    this.scope.speakers = speakers;
                    return this.scheduleService.get();
                })
                .then((shcedules) => {
                    shcedules = shcedules.data;
                });

            this.scope.daysLeft = endDay - today;
        }

    }
}

