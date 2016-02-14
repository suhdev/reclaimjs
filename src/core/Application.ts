import * as express from 'express';
import {Injector} from './Injector';

/**
 * 
 * Represents a single application 
 *
 */
export class Application {
	private server:express.Express;
	private router: express.Router;
	private injector: Injector;
	constructor(){
		this.server = express();
	}

	public config(fn:Function){

	}

	public run(fn:Function){

	}

	public getServer():express.Express{
		return this.server;
	}

}
