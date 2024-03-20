import Project, { IProject } from "./Project";

const ImplementError = new Error("Implement in frontend");

export default class ProjectFrontend extends Project {
	constructor() {
		super();
	}
	override async addProject(): Promise<any> {
		throw ImplementError;
	}
	override async deleteProject(): Promise<any> {
		throw ImplementError;
	}
	override async updateProject(): Promise<any> {
		throw ImplementError;
	}
	override async getProjects(): Promise<IProject[]> {
		throw ImplementError;
	}
}
