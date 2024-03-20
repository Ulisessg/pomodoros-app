import Task, { ITask } from "../task/Task";

export default class SubTaskBackend extends Task {
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
