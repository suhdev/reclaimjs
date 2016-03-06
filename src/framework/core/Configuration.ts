import {EventEmitter} from 'events';
import {ResourceResolver} from './ResourceResolver';
import {getDataAt,setDataAt} from './Core';
import * as _ from 'lodash';

export default class Configuration extends EventEmitter{
	private config: any;
	constructor(resolver: ResourceResolver) {
		super();
		this.config = {
			app: require(resolver.getConfigPath('app.json')),
			site: require(resolver.getConfigPath('site.json')),
			user: require(resolver.getConfigPath('user.json'))
		};
	}

	set(key:string,value:any){
		setDataAt(this.config, key, value, '.');
	}

	get(key:string):any{
		return getDataAt(this.config, key, '.');
	}
}