module barcamp {

    export interface  ITimetableControllerScope extends ng.IScope {
        rooms: string[];
        roomKeys: string[];
        scheduleRooms: any;
        days: number[];
        selectedDay: number;
    }

    export interface ITimetableController {
        getEventByDay(day: number): void;
        timeToPx(time: number): number;
    }

    export class TimetableController implements ITimetableController {
        public scope:barcamp.ITimetableControllerScope;
        private scheduleService:barcamp.IScheduleService;
        private moment: any;

        constructor($scope:barcamp.ITimetableControllerScope, Schedule:barcamp.IScheduleService, moment: any) {
            this.scope = $scope;
            this.scheduleService = Schedule;
            this.moment = moment;
            this.scope.rooms = ['Big Hall', 'W1', 'W2', 'P1', 'P2'];
            this.scope.roomKeys = ['big_hall', 'w1', 'w2', 'p1', 'p2'];
            this.scope.days = [1, 2];
            this.scope.selectedDay = 1;
            this.getEventByDay(this.scope.selectedDay);
        }

        getEventByDay(day: number): void {
            this.scope.selectedDay = day;

            //Todo: set date
            var eventDay = new Date();
            var startTime = this.moment(eventDay).startOf('day').hour(9).minute(0);

            this.scheduleService.getByDay(this.scope.selectedDay)
                .then((scheduleList) => {
                    scheduleList = scheduleList.data;
                    scheduleList = [
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "W1",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-27 09:30:42.00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-27 11:00:42.00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },

                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "W1",
                            en: {
                                speaker: "Foo Bar",
                                topic: "Dvdfgdfg Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-27 12:30:42.00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-27 13:20:42.00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },


                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "Big Hall",
                            en: {
                                speaker: "gfghggh fggfh",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "ghfgh"
                            },
                            time_from: {
                                date: "2015-05-27 16:00:42.00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-27 17:20:42.00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },


                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "p1",
                            en: {
                                speaker: "gfghggh fggfh",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "ghfgh"
                            },
                            time_from: {
                                date: "2015-05-27 10:00:00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-27 12:00:00",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        }
                    ];

                    var scheduleRooms = {
                        big_hall : [],
                        w1: [],
                        w2: [],
                        p1: [],
                        p2: []
                    };

                    scheduleList.forEach((schedule: any) => {
                        var eventStart = this.moment(schedule.time_from.date);
                        var eventEnd = this.moment(schedule.time_to.date);

                        var height = this.timeToPx(eventEnd.diff(eventStart));
                        var top = this.timeToPx(eventStart.diff(startTime));

                        schedule.height = height + 'px';
                        schedule.top = top + 'px';

                        scheduleRooms[schedule.room.trim().replace(' ','_').toLowerCase()].push(schedule);
                    });

                    this.scope.scheduleRooms = scheduleRooms;

                });
        }

        timeToPx(time: number): number {
            var h = (time/1000/60/60);
            return h * 202 + h
        }
    }
}
