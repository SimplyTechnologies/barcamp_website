/**
 * Created by Shahen on 31/05/2016.
 */

module barcamp {

    export interface IMenuDropdownScope extends ng.IScope {}

    export class  MenuDropdown implements ng.IDirective {

        public scope: Object = {};
        public restrict: string;

        constructor() {
            console.log(this);
            this.restrict = "A";
        }

        public link(scope: IMenuDropdownScope, element: ng.IAugmentedJQuery) {
            console.log(element, scope);
        }

        public static Factory(): any {

            return function () {
                return new MenuDropdown();
            };
        }
    }
}
