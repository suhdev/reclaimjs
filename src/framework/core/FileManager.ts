import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
export default class FileManager extends EventEmitter{
	storageUrl: string;
	storagePath: string;
	storage: Storage;
	constructor(storagePath:string,storageUrl:string){
		super();
		this.storagePath = storagePath;
		this.storageUrl = storageUrl;
		this.emit('Created', {
			storagePath:storagePath,
			storageUrl: storageUrl
		});
	}

	public setStorage(storage:Storage){
		this.storage = storage;
	}

	public store(){

	}

	static factory(storagePath:string,storageUrl:string){
		return new FileManager(storagePath, storageUrl);

	}
	static $inject = ['storagePath', 'storageUrl'];
}


export interface Storage {
	store(filename: string):Promise<any>;
}