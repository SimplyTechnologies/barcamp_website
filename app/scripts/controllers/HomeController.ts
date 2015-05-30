/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {
        speakers: any;
        keys: any;
        rooms: any;
        shcedulesRows: any;
        $parent: any;
        showHomeSchedule: boolean;
        streamUri: any;
        currentStream: string;
    }

    export interface IHomeController {
        init(): void;
        changeStream(roomKey: string): void;
    }

    export class HomeController implements IHomeController {
        public scope:barcamp.IHomeControllerScope;
        private speakerService:barcamp.ISpeakerService;
        private scheduleService:barcamp.IScheduleService;
        private translate: any;
        private moment: any;
        private sce: any;

        constructor($scope:barcamp.IHomeControllerScope,
                    $translate: any,
                    Speaker:barcamp.ISpeakerService,
                    Schedule:barcamp.IScheduleService,
                    $sce: any,
                    moment: any) {

            this.scope = $scope;
            this.speakerService = Speaker;
            this.scheduleService = Schedule;
            this.translate = $translate;
            this.moment = moment;
            this.sce = $sce;

            this.scope.keys = Object.keys;
            this.scope.rooms = ['Big Hall', '208E', '213W', '113W', '114W'];
            this.scope.streamUri = {
                _big_hall: ['Big Hall', this.sce.trustAsResourceUrl('https://www.youtube.com/embed/mZ9AdNGbbFg')],
                _208e: ['208E',this.sce.trustAsResourceUrl('https://www.youtube.com/embed/97O6U8J9wxw')],
                _213w: ['213W', this.sce.trustAsResourceUrl('https://www.youtube.com/embed/kwK-PVSQftY')]
            };

            this.scope.currentStream = "_big_hall";

            var d = new Date();
            var h = d.getHours();
            this.scope.showHomeSchedule = (this.scope.$parent.daysLeft <= 0) && (h >= 9 && h < 18);
            this.init();
        }

        init():void {

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
                                var startTime = this.moment(shcedules[j].time_from.date);
                                if(this.moment().diff(startTime, 'seconds') < 0 && vIndex == 0) {
                                    vIndex++;
                                }

                                this.scope.shcedulesRows[vIndex++][i] = shcedules[j];
                            }
                        }
                    }

                });
        }

        changeStream(roomKey: string): void {
            this.scope.currentStream = roomKey;
        }

    }
}

