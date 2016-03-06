import {ResourceResolver} from './ResourceResolver';
import {format,getDataAt} from './Core';

export class Localization {
	resolver: ResourceResolver;
	locale: string;
	constructor(locale:string,resourceResolver: ResourceResolver) {
		this.locale = locale;
		this.resolver = resourceResolver;
	}

	get(key:string,data?:any):string{
		var k = key.split('.'),
			loc:any;
		if (k.length === 0){
			return;
		}
		if (k.length === 1){
			return require(this.resolver.getLocalizationPath(k[0]));
		}
		loc = require(this.resolver.getLocalizationPath(k.shift()));
		return format(getDataAt(loc,k.join('.')), data);
	}

	static factory(locale:string, resourceResolver:ResourceResolver){
		return new Localization(locale,resourceResolver);
	}

	static $inject: string[] = ['locale','resourceResolver'];

}

export default Localization;