module barcamp {
	export interface IUrlStorageService extends ng.translate.IStorage {
		put(name: string, value: string): void;
	}

	export class UrlStorageService implements IUrlStorageService {
		private $location: ng.ILocationService;

		constructor($STORAGE_KEY: string, $location: ng.ILocationService) {
			this.$location = $location;
		}

		get = (name: string) : string => {
	 		return this.$location.search()[name] || 'en'; 
		}

		set = (name: string, value: string) : void => { 
			this.$location.search(name, value); 
		}

		put  = (name: string, value: string) : void => { 
			this.$location.search(name, value); 
		}
	}
}