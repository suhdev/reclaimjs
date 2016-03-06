"use strict";
import {ReadLine,createInterface,Completer,CompleterResult} from 'readline';
import {Command} from './Command';
import {Dictionary} from '../core/Core';
import * as path from 'path';

interface CompletionCallback{
	(err: any, result: any[]): void;
}

export class CommandLine {
	readline: ReadLine;
	commands: Dictionary<Command>;
	currentDirectory: string;
	currentCommand: Command;
	completions: string[];
	completer: Completer;
	constructor(cwd:string){
		let self = this;
		this.currentCommand = null;
		this.commands = {};
		this.currentDirectory = cwd;
		this.completer = this.complete.bind(this);
		this.readline = createInterface({
			input: process.stdin,
			output: process.stdout,
			completer:this.completer
		});
		this.readline.setPrompt('reclaimjs> ');
	}

	setCompletions(completions:string[]):void{
		this.completions = completions;
	}

	complete(line:string,callback:CompletionCallback):any{
		let hits: string[] = this.completions.filter((v) => {
			return v.indexOf(line) !== -1;
		});
		callback(null, [hits.length >0?hits:this.completions, line]);
	}

	command(name:string,exc:Command):CommandLine{
		this.commands[name] = exc;
		return this;
	}

	execute(name:string):void{
		this.currentCommand = this.commands[name];
		this.currentCommand.execute(this.readline,this);
	}

	getCurrentDir(){
		return this.currentDirectory;
	}

	resolvePath(p:string){
		return path.resolve(this.currentDirectory, p);
	}

	retry():void{
		this.currentCommand.execute(this.readline, this);
	}
}