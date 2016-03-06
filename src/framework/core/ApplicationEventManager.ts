import {EventEmitter} from 'events';
export default class ApplicationEventManager extends EventEmitter {
	constructor(){
		super();
	}

	static factory(){
		return new ApplicationEventManager();
	}
}