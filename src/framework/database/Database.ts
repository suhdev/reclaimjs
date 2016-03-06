import {DatabaseConfig} from '../core/Config';
import {Injector} from '../core/Injector';
import {SqlDatabase} from './SqlDatabase';
import {MongoDatabase} from './MongoDatabase';
import {RethinkDatabase} from './RethinkDatabase';
import * as knex from 'knex';
import * as rethinkdb from 'rethinkdb';
import * as mongoose from 'mongoose';
import * as bookshelf from 'bookshelf';

export class Database {
	injector: Injector;
	
	constructor(DI: Injector) {
		this.injector = DI;
	}

	public startUp() {
		if (this.injector.hasInstance('knexConfiguration')) {
			this.injector.register('sqlDatabase', SqlDatabase);
		}
		if (this.injector.hasInstance('rethinkdbConfiguration')) {
			this.injector.register('rethinkDatabase', RethinkDatabase);
		}
		if (this.injector.hasInstance('mongooseConfiguration')) {
			this.injector.register('mongoDatabase', MongoDatabase);
		}
	}

	public sql(){
		return this.injector.get('sqlDatabase');
	}

	public mongodb(){
		return this.injector.get('mongoDatabase');
	}

	public rethinkdb(){
		return this.injector.get('rethinkDatabase');
	}

	static factory(DI: Injector) {
		return new Database(DI);
	}

	static $inject: string[] = ['DI'];
}