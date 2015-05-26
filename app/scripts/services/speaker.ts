module barcamp {
  export interface ISpeakerService {
    get(): ng.IPromise<any>;
  }

  export class SpeakerService implements ISpeakerService {
    public http: ng.IHttpService;

    constructor($http: ng.IHttpService) {
      this.http = $http;
    }

    get(): ng.IPromise<any> {
      return this.http.get('http://api.barcamp.am/speakers', { responseType: 'json' });
    }
  }
}
