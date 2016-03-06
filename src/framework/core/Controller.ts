export interface ControllerGen{
	new (): Controller;
}
export abstract class Controller {

	abstract onInstall(expressApp: Express.Application): void;
}