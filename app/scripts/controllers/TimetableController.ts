module barcamp {

    export interface  ITimetableControllerScope extends ng.IScope {
        rooms: string[];
        roomKeys: string[];
        scheduleRooms: any;
        days: number[];
        selectedDay: number;
        eventDate: any;
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
            this.scope.eventDate = {1: new Date('2015-05-30'), 2: new Date('2015-05-31')}; //temporary
            this.scope.selectedDay = 1;
            this.getEventByDay(this.scope.selectedDay);
        }

        getEventByDay(day: number): void {
            var startTime = this.moment(this.scope.eventDate[day]).startOf('day').hour(9).minute(0);
            this.scope.scheduleRooms = {};
            this.scheduleService.getByDay(day)
                .then((scheduleList) => {
                    scheduleList = scheduleList.data;

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

                    this.scope.selectedDay = day;
                });
        }

        timeToPx(time: number): number {
            var h = (time/1000/60/60);
            return h * 202 + h
        }
    }
}
