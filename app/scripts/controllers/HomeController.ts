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

                    shcedules = [
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "Big Hall",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
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
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "W2",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "P1",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "P2",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "Big Hall",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
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
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "W2",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "P1",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "P2",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "Big Hall",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
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
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "W2",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "P1",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        },
                        {
                            bg_image_url: "http://api.barcamp.am/i/speaker/1_samvel.png",
                            room: "P2",
                            en: {
                                speaker: "Samvel Martirosyan",
                                topic: "Data Verification"
                            },
                            hy: {
                                speaker: "Սամվել Մարտիրոսյան",
                                topic: "Դաթա Վերիֆիքեյշն"
                            },
                            time_from: {
                                date: "2015-05-30 10:00:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            },
                            time_to: {
                                date: "2015-05-30 10:30:42.000000",
                                timezone_type: 3,
                                timezone: "America\/Chicago"
                            }
                        }
                    ];

                    this.scope.shcedulesRows = [[], [], []];

                    for (var i:number = 0; i < this.scope.shcedulesRows.length; i++) {
                        for (var j:number = 0; j < this.scope.rooms.length; j++) {
                            for (var k:number = 0; k < shcedules.length; k++) {
                                if(shcedules[k].room == this.scope.rooms[j]) {
                                    this.scope.shcedulesRows[i].push(shcedules.splice(k, 1)[0]);
                                    break;
                                }
                            }
                        }
                    }
                });

            this.scope.daysLeft = endDay - today;
            this.scope.daysLeft = 0;
        }

    }
}

