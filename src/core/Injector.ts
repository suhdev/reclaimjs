'use strict';
import * as Promise from 'bluebird';
import {Dictionary} from './Core';
export class Injector {
	components: Dictionary<any>;
	instances: Dictionary<any>;
	private stack: Array<any>;
	constructor(){
		this.components = {};
		this.instances = {};
		this.stack = [];
	}

	public addInstance(name:string,c:any){
		return this.instances[name] = c;
	}

	public addComponent(name:string,c:any){
		return this.components[name] = c; 
	}

	private _inject(name:string, c:any):any{
		let a: any, all:Array<any> = [];
		if (c.$inject.length === 0){
			return this.addInstance(name, c()); 
		}

		if (this.stack.indexOf(name) !== -1){
			throw new Error('Circular dependency: ' + this.stack.join(' -> ') + ' -> ' + name);
		}

		this.stack.push(name);
		while((a=c.$inject.shift())){
			all.push(this.get(a));
		}
		this.stack.pop();
		return this.instances[name] = c.apply(null, all);

	}

	public get(name:string):any{
		if (this.instances[name]){
			return this.instances[name]; 
		}
		if (!this.components[name]){
			throw new Error('Component: '+name+' could not be found');
		}
		return this._inject(name, this.components[name]);
	}

	public register(name: string, o: Object): Injector;
	public register(name: string, n: number): Injector;
	public register(name: string, fn: Function): Injector;
	public register(name:string, array: Array<any>): Injector;
	public register(array: Array<any>): Injector;
	public register():Injector
	{
		let name: string, callback: any, c:any; 
		if (arguments.length === 2){
			if (typeof arguments[0] !== "string") {
				throw new Error('Injector: first argument must be of type string.');
			}
			name = arguments[0];
			if (!(arguments[1] instanceof Array)){
				this.addInstance(name,arguments[1]);
				return this;
			}
			c = arguments[1]; 
			if (c.length === 0 || typeof c[c.length - 1] !== "function") {
				throw new Error('Injector: second argument is an empty Array!');
			}
			c[c.length - 1].$inject = c.slice(0, c.length - 1);
			this.addComponent(name, c);
			return this;
		}else if (arguments.length === 1){
			c = arguments[0];
			if (typeof c === "function"){
				if (!c.name){
					throw new Error("Function parameter must have a name"); 
				}
				callback = c;
				callback.toString()
					.replace(/^function[\s]+?[\S]+?\((.*?)\)/, function(e: string, v: string, k: number) {
						callback.$inject = v.trim().length > 0?v.trim().split(/[\s,]+/):[]//.map(function(e){return e.trim()}):[];
						return e;
					});
				this.addComponent(callback.name, callback);
				return this;
			}else if (c instanceof Array &&
				typeof c[c.length -1] === "function" &&
				c[c.length -1].name){
				callback = c[c.length - 1];
				callback.$inject = c.slice(0, c.length - 1);
				this.addComponent(callback.name, callback);
				return this;
			}
		}
		throw new Error('Invalid parameter');
	}
}

module.exports = Injector;