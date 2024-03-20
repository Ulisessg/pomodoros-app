import Task, { ITask } from "./Task";

export default class TaskBackend extends Task {
	constructor() {
		super();
	}
	public addTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public deleteTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public updateTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public getTasks(): Promise<ITask[]> {
		throw new Error("Method not implemented.");
	}
}
