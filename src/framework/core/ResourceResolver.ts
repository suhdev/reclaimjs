import {Injector} from './Injector';
import {FileSystemConfig} from './Config';
let path = require('path');
export class ResourceResolver{
	injector: Injector;
	config: FileSystemConfig;
	basePath: string;
	storagePath: string;
	resourcesPath: string;
	viewsPath: string;
	i18nPath: string;
	appPath: string;
	configPath: string;
	publicPath: string;

	constructor(DI:Injector,basePath:string,filesystemConfiguration:FileSystemConfig){
		this.injector = DI;
		this.basePath = basePath;
		this.storagePath = path.resolve(basePath, this.config.paths.storagePath);
		this.resourcesPath = path.resolve(basePath, this.config.paths.resourcesPath);
		this.publicPath = path.resolve(basePath, this.config.paths.publicPath);
		this.appPath = path.resolve(basePath, this.config.paths.appPath);
		this.viewsPath = path.resolve(basePath, this.config.paths.viewsPath);
		this.i18nPath = path.resolve(basePath, this.config.paths.i18nPath);
		this.config = filesystemConfiguration;
	}

	public getResourcesPath(p:string =''){
		return path.resolve(this.resourcesPath,p);
	}

	public getViewsPath(p:string=''){
		return path.resolve(this.viewsPath, p);
	}

	public getLocalizationPath(p:string=''){
		return path.resolve(this.i18nPath, p);
	}

	public getBasePath(p:string=''):string{
		return path.resolve(this.basePath, p);
	}

	public getAppPath(p:string=''):string{
		return path.resolve(this.appPath, p);
	}

	public getPublicPath(p:string=''):string{
		return path.resolve(this.publicPath,p);
	}

	public getConfigPath(p:string=''){
		return path.resolve(this.basePath,'./config/',p);
	}

	static factory(DI:Injector,basePath:string,fileSystemConfig:FileSystemConfig){
		return new ResourceResolver(DI, basePath, fileSystemConfig);
	}

	static $inject: [string] = ['DI','basePath','filesystemConfiguration'];
}

export default ResourceResolver;