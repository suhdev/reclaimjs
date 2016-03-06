'use strict';
export interface Dictionary<T> {
	[idx:string]:T
}

export interface Initializer {
	startUp(): void;
}

export function extractArgumentsFromFunction(fn:Function):any{
	let deps:any; 
	fn.toString()
		.replace(/^function[\s]+?[\S]+?\((.*?)\)/, function(e: string, v: string, k: number) {
			deps = (v.trim().length > 0 && v.trim().split(/[\s,]+/)) || [];
			return e;
		})
	return deps;
}

export function getDataAt(object:any,path:string,pathSep:string='.'):any{
	let o:any = object,
		key:string,
		temp:any,
		list:string[]=path.split(pathSep);
	while((key = list.shift()) && (temp = o[key]) && (o = temp));
	return temp;
}

export function setDataAt(object:any,path:string,value:any,pathSep:string='.'):any{
	let o: any = object,
		key: string,
		temp: any,
		list: string[] = path.split(pathSep),
		lastKey:string = list.length > 0?list.splice(list.length -1,1)[0]:null;
	while ((key = list.shift()) && ((temp = o[key]) || (temp = o[key] = {})) && (o = temp));
	temp[lastKey] = value;
}

export function format(value:string,replacements:any):string{
	if (!replacements){
		return value;
	}
	return value.replace(/\{(.*?)\}/g, function(k, e) { 
		return (replacements && replacements[e]) || k;
	});
}