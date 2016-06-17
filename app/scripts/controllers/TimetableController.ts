module barcamp {

    declare var scheduleRooms;

    export interface  ITimetableControllerScope extends ng.IScope {
        rooms: string[];
        roomKeys: string[];
        scheduleRooms: any;
        days: number[];
        selectedDay: number;
        eventDate: any;
        getSchedules: any;
        selectedRoom: string;
        selectedRoomsSchedules: Array<Object>;
    }

    export interface ITimetableController {
        getEventByDay(day: number): void;
        timeToPx(time: number): number;
    }

    export class TimetableController implements ITimetableController {

        public scope:barcamp.ITimetableControllerScope;
        public $sce: ng.ISCEService;
        private scheduleService:barcamp.IScheduleService;
        private moment: any;

        constructor($scope:barcamp.ITimetableControllerScope, Schedule:barcamp.IScheduleService, moment: any, $sce: ng.ISCEService) {
            this.scope = $scope;
            this.$sce = $sce;
            this.scheduleService = Schedule;
            this.moment = moment;
            this.scope.rooms = ['Big Hall', '215E', '315E', '113W', '114W'];
            this.scope.roomKeys = ['_big_hall', '_215e', '_315e', '_113w', '_114w'];
            this.scope.days = [1, 2];
            this.scope.eventDate = {1: new Date('2016-06-18'), 2: new Date('2016-06-19')}; //temporary
            this.scope.selectedDay = 1;
            this.scope.getSchedules = this.getSchedules;
            this.scope.selectedRoom = this.scope.roomKeys[0];
            this.getEventByDay(this.scope.selectedDay);
        }

        getEventByDay(day: number): void {
            var startTime = this.moment(this.scope.eventDate[day]).startOf('day').hour(9).minute(0);
            this.scope.scheduleRooms = {};
            this.scheduleService.getByDay(day)
                .then((scheduleList) => {
                    scheduleList = scheduleList.data;

                    var scheduleRooms = {
                        _big_hall : [],
                        _215e: [],
                        _315e: [],
                        _113w: [],
                        _114w: []
                    };

                    scheduleList.forEach((schedule: any) => {
                        var eventStart = this.moment(schedule.time_from.date).startOf('minute');
                        var eventEnd = this.moment(schedule.time_to.date).startOf('minute');

                        var height = this.timeToPx(eventEnd.diff(eventStart));
                        var top = this.timeToPx(eventStart.diff(startTime));

                        schedule.height = height + 'px';
                        schedule.top = top - 252 - 1 + 'px';

                        schedule.rateUrl = this.$sce.trustAsResourceUrl("https://www.truthly.me/embed/" + schedule.id);
                        var roomKey = '_' + schedule.room.trim().replace(' ','_').toLowerCase();

                        if (scheduleRooms[roomKey]) {
                            scheduleRooms[roomKey].push(schedule);
                        }
                    });

                    this.scope.scheduleRooms = scheduleRooms;

                    this.scope.selectedDay = day;
                });
        }

        timeToPx(time: number): number {
            var h = (time/1000/60/60);
            return h * 252 + h
        }

        getSchedules(room: string): Object {
            //noinspection TypeScriptUnresolvedVariable
            var schedule = this.scheduleRooms[room];
            if (!schedule || !schedule.length) {
                return [0, 1, 2, 3, 4, 5, 6, 7, 8];
            }
            var length = schedule.length;

            if (length < 9) {
                while(length < 9) {
                    schedule.push(Math.random() * 100);
                    length++;
                }
            }
            return schedule;
        }
    }
}
