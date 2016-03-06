import {ReadLine} from 'readline'; 
import {CommandStep} from './CommandStep'; 
import {Command} from './Command'; 
import {CommandLine} from './CommandLine';

export interface Task {
	(readline: ReadLine, step: CommandStep, command: Command, commandLine: CommandLine, next: () => {}): void;
	name: string;
}