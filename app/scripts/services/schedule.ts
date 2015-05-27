module barcamp {
  export interface IScheduleService {
    get(): ng.IPromise<any>;
    getAll(): ng.IPromise<any>;
  }

  export class ScheduleService implements IScheduleService {
    public http: ng.IHttpService;

    constructor($http: ng.IHttpService) {
      this.http = $http;
    }

    get(): ng.IPromise<any> {
      return this.http.get('http://api.barcamp.am/schedule/actual', { responseType: 'json' });
    }

    getAll(): ng.IPromise<any> {
      return this.http.get('http://api.barcamp.am/schedule', { responseType: 'json' });
    }
  }
}
