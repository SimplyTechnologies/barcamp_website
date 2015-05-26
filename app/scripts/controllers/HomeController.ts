/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {
        daysLeft: number;
        speakers: any;
    }

    export interface IHomeController {
        init(): void;
    }

    export class HomeController implements IHomeController {
        public scope:barcamp.IHomeControllerScope;
        private speakerService:barcamp.ISpeakerService;

        constructor($scope:barcamp.IHomeControllerScope,
                    Speaker:barcamp.ISpeakerService) {
            this.scope = $scope;
            this.speakerService = Speaker;
            this.init();
        }

        init():void {
            var endDay:number = new Date(2015, 5, 30).getDate();
            var today:number = new Date().getDate();

            this.speakerService.get()
                .then((speakers: any) => {
                    this.scope.speakers = speakers;
                });
            this.scope.daysLeft = endDay - today;
        }
    }
}

