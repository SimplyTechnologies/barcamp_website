/// <reference path="../references.ts"/>

module barcamp {

    export interface  IHomeControllerScope extends ng.IScope {
        speakers: any;
        specialGuests: Array<Object>;
        keys: any;
        rooms: any;
        shcedulesRows: any;
        $parent: any;
        schedules: Array<Object>;
        showHomeSchedule: boolean;
    }

    export interface IHomeController {
        init(): void;
    }

    export class HomeController implements IHomeController {
        public scope:barcamp.IHomeControllerScope;
        private speakerService:barcamp.ISpeakerService;
        private scheduleService:barcamp.IScheduleService;
        private translate: any;
        private moment: any;

        constructor($scope:barcamp.IHomeControllerScope,
                    $translate: any,
                    Speaker:barcamp.ISpeakerService,
                    Schedule:barcamp.IScheduleService,
                    moment: any) {

            this.scope = $scope;
            this.speakerService = Speaker;
            this.scheduleService = Schedule;
            this.translate = $translate;
            this.moment = moment;
            this.scope.keys = Object.keys;
            this.scope.rooms = ['Big Hall', '208E', '213W', '113W', '114W'];

            var d = new Date();
            var h = d.getHours();
            this.scope.showHomeSchedule = (this.scope.$parent.daysLeft <= 0) && (h >= 9 && h < 18);
            this.init();
        }

        init():void {

            this.speakerService.get()
                .then((speakers: any) => {
                    this.scope.specialGuests = speakers.data.splice(0, 5);
                    speakers = speakers.data;
                    this.scope.speakers = speakers;
                    return this.scheduleService.get();
                })
                .then((shcedules) => {

                    shcedules = shcedules.data;
                    /**
                     * @example {shcedules} Array
                     * [{
                     *  room: "208E",
                     *  time_from: {
                     *      date: Date
                     *  },
                     *  time_to: {
                     *      date: Date
                     *  },
                     *  hy: {
                     *      topic: String
                     *  },
                     *  en: {
                     *      topic: String
                     *  }
                     * }]
                     *
                     * */
                    this.scope.shcedulesRows = [
                        [null, null, null, null, null],
                        [null, null, null, null, null],
                        [null, null, null, null, null]
                    ];

                    this.scope.schedules = [];

                    for (var i: number = 0; i < this.scope.rooms.length; i++) {
                        var _object = {
                            room: this.scope.rooms[i],
                            schedules: [null, null, null]
                        };
                        var vIndex: number = 0;
                        //noinspection TypeScriptUnresolvedVariable
                        for (var j: number = 0; j < shcedules.length && vIndex < 3; j++) {
                            if(shcedules[j].room == this.scope.rooms[i]) {
                                var startTime = this.moment(shcedules[j].time_from.date);
                                if(this.moment().diff(startTime, 'seconds') < 0 && vIndex == 0) {
                                    vIndex++;
                                }

                                _object.schedules.push(shcedules[j]);
                                this.scope.shcedulesRows[vIndex++][i] = shcedules[j];
                            }
                        }
                        this.scope.schedules.push(_object);
                    }
                });
        }

    }
}

