import {Controller} from './Controller';
import * as bookshelf from 'bookshelf';
import {Router,Request,Response,NextFunction} from 'express';
export class SqlRestfulController {
	url:string;
	model: any;
	router: Router;
	constructor(urlExtention: string, model: any) {
		this.url = urlExtention;
		this.model = model;
	}

	onGet(req:Request,resp:Response,next:NextFunction){
		(new this.model({
			id: req.params.id
		}))
		.fetch()
		.then(function(model: bookshelf.Model<any>) { 
			resp.json(model);
		});
	}

	onPut(req:Request,resp:Response,next:NextFunction){
		(new this.model({id:req.params.id}))
		.save(req.body)
		.then(function(model: bookshelf.Model<any>) { 
			resp.json(model);
		});
	}

	onPost(req:Request,resp:Response,next:NextFunction){
		(new this.model(req.body))
		.save()
		.then(function(model: bookshelf.Model<any>) { 
			resp.json(model);
		});
	}

	onList(req:Request,resp:Response,next:NextFunction){
		this.model.fetchAll()
			.then(function(models: any) { 
				resp.json(models);
			});
	}

	onQuery(req:Request,resp:Response,next:NextFunction){
		this.model.where(req.body)
			.then(function(models: any) { 
				resp.json(models);
			});
	}

	onDelete(req:Request,resp:Response,next:NextFunction){
		(new this.model({ id: req.params.id }))
			.destroy()
			.then(function(model: any) { 
				resp.json(model);
			});
	}

	onInstall(router:Router){
		router.get(this.url,this.onGet.bind(this));
		router.get(this.url.replace(/:id/, 'list'), this.onList.bind(this));
		router.put(this.url, this.onPut.bind(this));
		router.post(this.url.replace(/:id/, 'create'), this.onPost.bind(this));
		router.post(this.url.replace(/:id/, 'query'), this.onQuery.bind(this));
		router.delete(this.url, this.onDelete.bind(this));
	}
	
}