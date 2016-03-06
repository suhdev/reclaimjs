import {CommandLine} from './CommandLine';
import {ReadLine} from 'readline';
import {CommandStep} from './CommandStep';

export class Command {
	steps: CommandStep[];
	execution: CommandStep[];
	currentStep: CommandStep;
	nexter: any;
	constructor(steps:CommandStep[]=[]){
		this.steps = steps;
		this.execution = [];
		this.currentStep = null;
	}

	step(step:CommandStep):void{
		this.steps.push(step);
	}

	next(readline:ReadLine,commandLine:CommandLine):void{
		this.currentStep = this.execution.shift(); 
		if (!this.currentStep) {
			this.finish(commandLine);
			return;
		}
		this.currentStep.execute(readline, this.currentStep, this, commandLine,this.nexter);
	}

	execute(readline:ReadLine,commandLine:CommandLine):void{
		this.execution = this.steps.slice(0);
		this.nexter = () => {
			this.next(readline, commandLine);
		}; 
		this.next(readline,commandLine);
	}

	finish(cmdLine:CommandLine): void{
		console.log('Execution ended');
		

	}
}