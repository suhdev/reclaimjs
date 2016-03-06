'use strict'; 
let fs = require('fs'),
	path = require('path');
import * as lodash from 'lodash';
import * as Promise from 'bluebird';
import {ResourceResolver} from './ResourceResolver';
import {Page, PageMeta} from './Page';
export class PageBuilder {
	resolver: ResourceResolver;
	page: any;
	constructor(resolver: ResourceResolver) {
		this.resolver = resolver;
	}

	fromPage(pageKey:string){
		this.page = Object.assign({},require(this.resolver.getConfigPath('pages/default.json')),
			require(this.resolver.getConfigPath('pages/' + pageKey)));
	}

	fromDefault(){

	}

	static factory(configurator:ResourceResolver){
		return new PageBuilder(configurator);
	}

	static $inject = ['PathConfigurator'];
}

export default PageBuilder;