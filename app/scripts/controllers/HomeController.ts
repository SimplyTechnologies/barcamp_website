/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {
        daysLeft: number;
        speakers: any;
        keys: any;
        rooms: any;
        shcedulesRows: any;
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
            this.scope.keys = Object.keys;
            this.scope.rooms = ['Big Hall', 'W1', 'W2', 'P1', 'P2'];
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

                    this.scope.shcedulesRows = [[null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null]];

                    for (var i: number = 0; i < this.scope.rooms.length; i++) {
                        var vIndex: number = 0;
                        for (var j: number = 0; j < shcedules.length && vIndex < 3; j++) {
                            if(shcedules[j].room == this.scope.rooms[i]) {
                                if(moment().diff(shcedules[j].time_from.date, 'seconds') < 0 && vIndex == 0) {
                                    vIndex++;
                                }

                                this.scope.shcedulesRows[vIndex++][i] = shcedules[j];
                            }
                        }
                    }

                });

            this.scope.daysLeft = endDay - today;
        }

    }
}

