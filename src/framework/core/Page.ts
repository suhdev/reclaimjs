export interface PageMeta{
	name?: string;
	content: string;
	property?:string
}

export class Page {
	description: string;
	meta: [PageMeta];
	viewName: string;
	model: any;
	stylesheets: [string];
	scripts: [string];
	links: [string];
	title: string;
}