import * as knex from 'knex';
import * as bookshelf from 'bookshelf';
import {Injector} from '../core/Injector';

interface CreateModelFn{
	(bookshelf: bookshelf, knex: knex, injector: Injector): void;
}
export class SqlDatabase {
	knex: knex;
	bookshelf: bookshelf;
	injector: Injector;
	constructor(injector:Injector,config:knex.Config){
		this.injector = injector;
		this.knex = knex(config);
		this.bookshelf = bookshelf(this.knex);
	}

	query(): knex{
		return this.knex;
	}

	model(fn:CreateModelFn):void{
		fn(this.bookshelf,this.knex,this.injector);
	}

	static factory(injector:Injector,knexConfiguration:knex.Config){
		return new SqlDatabase(injector, knexConfiguration);
	}

	static $inject:string[] = ['DI','knexConfiguration'];

}