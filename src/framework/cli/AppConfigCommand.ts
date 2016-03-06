import {Command} from './Command';
import {Initializer} from './Initializer';
import {ReadLine} from 'readline';
import {CommandLine} from './CommandLine';
import {CommandStep} from './CommandStep';
import * as path from 'path';
import {AppConfig} from '../core/Config';
import * as fs from 'fs';

interface Configs {
	appConfig: AppConfig;

}

export class ConfigCommand extends Command{
	model:Configs;
	constructor(){
		super(); 
		this.model = {
			appConfig: require(path.resolve(__dirname, '../../config/app.json'))
		};
		let step: CommandStep = new CommandStep(); 
		step.task((readline: ReadLine, cmdStep: CommandStep, cmd: Command, cmdLine: CommandLine, next: () => {}) => { 
			readline.question('Do you want to enter the app configuration detials?: ', (answer) => {
				if (['yes', 'y', 'okay', 'ok'].indexOf(answer.toLowerCase().trim()) === -1) {
					cmdLine.
				}
				this.model.appConfig.appName = answer;
				next();
			});
		});
		
		this.tasks.push((readline: ReadLine, cmd: Command, cmdLine: CommandLine, next: () => {}) => {
			readline.question('Name of the application: ', (answer) => { 
				this.model.appConfig.appName = answer;
				next();	
			});
		});
		this.tasks.push((readline: ReadLine, cmd: Command, cmdLine: CommandLine, next:() => { }) => { 
			readline.question('Oranization: ', (answer) => { 
				this.model.appConfig.organization = answer; 
				next(); 
			});
		});
		this.tasks.push((readline: ReadLine, cmd: Command, cmdLine: CommandLine, next: () => {}) => {
			let p: string = cmdLine.resolvePath('./config/app.json');
			fs.writeFile(p, JSON.stringify(this.model.appConfig, null, '\t'),function(err:Error){
				if (err){
					throw err; 
				}
				next();
			});
		});

		this.tasks.push((readline: ReadLine, cmd: Command, cmdLine: CommandLine, next: () => {}) => {

	}
}