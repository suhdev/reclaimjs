/// <reference path="../express/express.d.ts" />
declare module nunjucks {
	interface WebConfig{
		useCache?: boolean;
		async?: boolean;
	}

	interface TagsConfig{
		blockStart?:string;
		blockEnd?:string;
		variableStart?:string;
		variableEnd?:string;
		commentStart?:string;
		commentEnd?:string;
	}
	interface Configuration {
		autoescape?: boolean;
		express?: any;
		throwOnUndefined?: boolean;
		trimBlocks?: boolean;
		lstripBlocks?: boolean;
		watch?: boolean;
		noCache?: boolean;
		web?: WebConfig;
		tags?: TagsConfig;
	}

	interface Filter{
		(str: string, ...args: any[]): string;
	}

	interface Extension{

	}

	interface TemplateCallback{
		(err: Error, tmpl: Template): void;
	}

	export class Loader{
		static extend(o: Object): any;

	}

	interface WebLoaderOptions{
		useCache?: boolean;
		async?: boolean;
	}

	interface FileSystemLoaderOptions{
		noCache?: boolean;
		watch?: boolean;
	}

	export interface Environment{
		opts: Configuration;
		new (loader: Loader): Environment;
		new (loader: Loader, opts: Configuration): Environment;
		new (loaders: Loader[]): Environment;
		new (loaders: Loader[], opts: Configuration): Environment;
		addFilter(filterName: string, filterFn: Filter):Environment;
		getFilter(name: string): Filter;
		addExtension(name: string, ext: Extension):void;
		getExtension(name: string): Extension;
		removeExtension(name: string): void;
		hasExtension(name: string): boolean;
		addGlobal(name: string, value: any): void;
		getGlobal(name: string): any;
		getTemplate(name: string, eagerCompile: boolean, callback: TemplateCallback):void;
		express(app: Express.Application): void;



	}

	export interface FileSystemLoader extends Loader{
		new (searchPaths?: [string],opts?:FileSystemLoaderOptions): FileSystemLoader;

	}

	export interface WebLoader extends Loader{
		new (viewsBaseUrl?: string, opts?: WebLoaderOptions): WebLoader;
	}

	interface CompileOptions{

	}

	export interface Template{
		new(src:string, env:Environment, path:string, eagerCompile:boolean):Template;
		render(context?: any,callback?:AsyncCallbackFn):string;
	}

	interface TemplateObject{
		name: string;
		template: string;
	}

	interface CallbackGenerator{
		(...args: any[]): Function;
	}

	interface WrapperCallback{
		(templates: TemplateObject[], options: PrecompileOptions):string;
	}

	interface PrecompileOptions{
		name?: string;
		asFunction?:CallbackGenerator;
		force?: boolean;
		env?: Environment;
		include?: string[];
		exclude?: string[];
		wrapper?: WrapperCallback;
	}

	interface AsyncCallbackFn{
		(err: Error, result: any): void;
	}
	/**
	 * Tell nunjucks that your templates live at path and flip any feature on or off with the opts hash. You can provide both arguments or either of them.
	 * @param path the path to the templates folder
	 * @param configuration the configuration options
	 */
	export function configure(path: string, configuration:Configuration):Environment;
	export function configure(configuration:Configuration): Environment;
	export function renderString(value: string, context?: any,callback?:AsyncCallbackFn):string;
	export function render(viewFileName: string, callback?: AsyncCallbackFn): string;
	export function render(viewFileName: string, context?:any,callback?:AsyncCallbackFn): string;
	export function compile(template: string,environment?:Environment,opts?:CompileOptions): Template;
	export function precompile(path: string, opts: PrecompileOptions):Template;
	export function precompileString(str: string, opts:PrecompileOptions): string;




}

declare module "nunjucks" {
	export = nunjucks;
}