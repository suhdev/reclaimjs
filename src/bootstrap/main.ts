'use strict';
let path = require('path');
import {Application} from '../framework/core/Application'; 
export function startUp(){
	let application = new Application(path.resolve(__dirname,'..'));
	main(application);
}

function main(application:Application){
	//do config here 

	//do run here

	application.start();
}