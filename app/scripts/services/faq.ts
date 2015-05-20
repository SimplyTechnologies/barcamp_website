/**
 * Created by Marat on 5/11/2015.
 */
module barcamp {
  export interface IFaqService {
    send(name: string, email: string, text: string): ng.IPromise<any>;
  }

  export class FaqService implements IFaqService {
    public http: ng.IHttpService;

    constructor($http: ng.IHttpService) {
      this.http = $http;
    }

    send(name: string, email: string, text: string): ng.IPromise<any> {
      return this.http.post('api/v1/questions', { name: name, email: email, text: text }, { responseType: 'json' });
    }
  }
}
