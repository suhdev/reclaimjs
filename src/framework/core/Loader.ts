import {ResourceResolver} from './ResourceResolver';
import {Injector} from './Injector';
import {Controller,ControllerGen} from './Controller';
import * as fs from 'fs';
export class Loader {
	resolver: ResourceResolver;
	injector: Injector;
	constructor(DI: Injector,resourceResolver:ResourceResolver){
		this.injector = DI;
		this.resolver = resourceResolver;
	}

	installModels():void{
		let app:any = require(this.resolver.getAppPath('models/install'));
		if (typeof app.startUp === "function"){
			this.injector.injectFunction(app.startUp);
		}
	}

	installControllers():void{
		let app: any = require(this.resolver.getAppPath('http/controllers/install'));
		if (typeof app.startUp === "function"){
			this.injector.injectFunction(app.startUp);
		}
	}

	controller(name: string, ctrl: ControllerGen) {
		let a = new ctrl();
		this.injector.injectFunction(a.onInstall, a);
		this.injector.addInstance(name, a);
	}

	installServices():void{
		let app: any = require(this.resolver.getAppPath('services/install'));
		if (typeof app.startUp === "function") {
			this.injector.injectFunction(app.startUp);
		}
	}

	static factory(DI:Injector,resolver:ResourceResolver):Loader{
		return new Loader(DI,resolver);
	}

	static $inject:string[] = ['DI','resourceResolver'];
}