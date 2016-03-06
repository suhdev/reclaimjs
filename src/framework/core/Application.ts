import * as express from 'express';
import {Injector} from './Injector';
import {AppConfig} from './Config';
import {EventEmitter} from 'events';
import {ResourceResolver} from './ResourceResolver';
import {Localization} from './Localization';
import {Database} from '../database/Database';
import {Loader} from './Loader';
import * as path from 'path';
// import * as nunjucks from 'nunjucks';
import {TemplateEngine} from './TemplateEngine';
/**
 * 
 * Represents a single application 
 *
 */
export class Application extends EventEmitter{
	private basePath: string;
	private server:express.Application;
	private router: express.Router;
	private injector: Injector;
	private configs: Function[];
	private runs: Function[];
	private loader: Loader;
	constructor(basePath:string){
		super();

		this.basePath = basePath;
		this.server = express();
		this.injector = new Injector();
		this.injector.register('basePath', basePath);
		this.injector.register('expressApp', this.server);
		this.startUp();
	}

	public startUp(){
		let appConfig: AppConfig = require(path.resolve(this.basePath, './config/app.json')),
			services: any = require(path.resolve(this.basePath, './config/services.json'));

		this.injector.register('DI', this.injector);
		this.injector.register('appConfiguration', appConfig);
		this.injector.register('baseUrl', appConfig.baseUrl);
		this.injector.register('locale', appConfig.locale);
		this.injector.register('fallbackLocale', appConfig.fallbackLocale);
		this.injector.register('appName', appConfig.appName);
		this.injector.register('environment', appConfig.environment);
		this.injector.register('serverConfiguration', require(path.resolve(this.basePath, './config/server.json')));
		this.injector.register('siteConfiguration', require(path.resolve(this.basePath, './config/site.json')));
		this.injector.register('filesystemConfiguration', require(path.resolve(this.basePath, './config/filesystem.json')));
		this.injector.register('errorsConfiguration', require(path.resolve(this.basePath, './config/errors.json')));
		this.injector.register('environmentConfiguration', require(path.resolve(this.basePath, './config/environment.json')));
		this.injector.register('databaseConfiguration', require(path.resolve(this.basePath, './config/database.json')));
		this.injector.register('resourceResolver', ResourceResolver);
		this.injector.register('localization', Localization);
		this.injector.register('loader', Loader);
		this.injector.register('database', Database);
		this.injector.register('templateEngine', TemplateEngine);

		for(let service in services){
			this.injector.register(service + 'Configuration', services[service]);
		}

		this.configs.forEach((v:Function):void=>{
			this.injector.injectFunction(v);
		});

		(<Loader>this.injector.get('loader')).installModels();
		(<Loader>this.injector.get('loader')).installServices();
		(<Loader>this.injector.get('loader')).installControllers();

	}

	public config(fn:Function){
		if (typeof fn !== "function"){
			throw Error("The configuration parameter must be a function");
		}
		this.configs.push(fn);
	}

	public run(fn:Function){
		if (typeof fn !== "function"){
			throw Error("The run parameter must be a function");
		}
		this.runs.push(fn);
	}

	public start(){
		
	}

	public getServer():express.Application{
		return this.server;
	}

}
