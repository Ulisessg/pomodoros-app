import SubTask, { ISubTask } from "./SubTask";

export default class SubTaskFrontend extends SubTask {
	public addSubTask(): Promise<ISubTask> {
		throw new Error("Method not implemented.");
	}
	public deleteSubTask(): Promise<ISubTask> {
		throw new Error("Method not implemented.");
	}
	public updateSubTask(): Promise<ISubTask> {
		throw new Error("Method not implemented.");
	}
	public getSubTasks(): Promise<ISubTask[]> {
		throw new Error("Method not implemented.");
	}
}
