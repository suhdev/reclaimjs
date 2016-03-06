import {Injector} from '../core/Injector';
import * as rethinkdb from 'rethinkdb';
export class RethinkDatabase {
	injector: Injector;
	connection: rethinkdb.Connection;

	constructor(injector:Injector,config:rethinkdb.ConnectionOptions){
		this.injector = injector;
		rethinkdb.connect(config, (err:Error,conn:rethinkdb.Connection) => {
			if (err){
				throw err;
			}
			this.connection = conn;
		});
	}

	close(){
		this.connection.close();
	}

	static factory(injector:Injector,rethinkdbConfiguration:rethinkdb.ConnectionOptions){
		return new RethinkDatabase(injector, rethinkdbConfiguration);
	}

	static $inject: string[] = ['DI','rethinkdbConfiguration'];
}