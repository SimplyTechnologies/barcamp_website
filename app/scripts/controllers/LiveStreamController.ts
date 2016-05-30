/**
 * Created by Shahen on 30/05/2016.
 */

module barcamp {

    export interface ILiveStreamScope extends ng.IScope {
        test: string;
    }

    export interface ILiveStreamController  {
        init(): void;
    }

    export class LiveStreamController implements ILiveStreamController {
        public scope: barcamp.ILiveStreamScope;

        constructor($scope: ILiveStreamScope) {
            this.scope = $scope;
            this.init();
            this.scope.test = "Hello WOrld";
        }

        init(): void {}
    }
}
