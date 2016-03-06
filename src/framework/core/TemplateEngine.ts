import * as nunjucks from 'nunjucks';

export class TemplateEngine {
	environment: nunjucks.Environment;
	constructor(viewsPath:string,config:nunjucks.Configuration,appExpress:Express.Application){
		this.environment = nunjucks.configure(viewsPath,Object.assign({},config,{express:appExpress}));
	}

	static factory(viewsPath:string,templateEngineConfiguration:nunjucks.Configuration,
		appExpress:Express.Application):TemplateEngine{
		return new TemplateEngine(viewsPath, templateEngineConfiguration,appExpress);
	}
}

export default TemplateEngine;