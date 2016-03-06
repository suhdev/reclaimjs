import {Injector} from '../core/Injector';
import {MongooseConfig} from '../core/Config';
import * as mongoose from 'mongoose';
export interface SchemaCreateFn{
	(injector: Injector, mongoose: mongoose.Mongoose,schema:mongoose.SchemaType): void;
}

export interface ModelCreateFn{
	(injector: Injector, mongoose: mongoose.Mongoose, schema: mongoose.SchemaType): void;
}
export class MongoDatabase {
	injector: Injector;
	mongoose: mongoose.Mongoose;
	constructor(injector:Injector,mongooseConfiguration:MongooseConfig){
		this.injector = injector;
		this.mongoose = mongoose.connect(mongooseConfiguration.uri, mongooseConfiguration.options);
	}

	schema(fn:SchemaCreateFn){
		fn(this.injector, mongoose, mongoose.Schema);
	}

	model(fn:ModelCreateFn){
		fn(this.injector, this.mongoose, mongoose.Schema);
	}

	static factory(injector:Injector,mongooseConfiguration:MongooseConfig){
		return new MongoDatabase(injector,mongooseConfiguration);
	}

	static $inject:string[] = ['DI','mongooseConfiguration'];
}