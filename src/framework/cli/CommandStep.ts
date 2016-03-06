import {Task} from './Task';
import {ReadLine} from 'readline'; 
import {CommandLine} from './CommandLine'; 
import {Command} from './Command'; 
export class CommandStep {
	tasks: Task[];
	execution: Task[];
	currentTask: Task;
	nexter: any;
	constructor(tasks: Task[] = []) {
		this.tasks = tasks;
		this.execution = [];
		this.currentTask = null;
	}

	next(readline: ReadLine, command: Command, commandLine: CommandLine): void {
		this.currentTask = this.execution.shift();
		if (!this.currentTask) {
			this.finish(commandLine);
			return;
		}
		this.currentTask(readline, this, command, commandLine, this.nexter);
	}

	execute(readline: ReadLine, command: Command, commandLine: CommandLine): void {
		this.execution = this.tasks.slice(0);
		this.nexter = () => {
			this.next(readline, command, commandLine);
		};
		this.next(readline, command, commandLine);
	}

	task(task:Task):CommandStep{
		this.tasks.push(task);
		return this;
	}

	finish(cmdLine: CommandLine): void {
		console.log('Execution ended');
		

	}
}