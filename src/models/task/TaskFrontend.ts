import Task, { ITask } from "./Task";
import { CreateTaskResponse } from "@/app/api/tasks/POST";
import { TTask } from "@/context/TaskCtx/TaskCtx";
import { GetTaskResponse } from "@/app/api/tasks/GET";
import { PatchTaskBody } from "@/app/api/tasks/PATCH";
import axiosInstance from "@/utils/axiosInstance";

export default class TaskFrontend extends Task {
	constructor() {
		super();
	}
	public async addTask(): Promise<ITask> {
		const taskCreated = await axiosInstance.post<CreateTaskResponse>("/tasks", {
			name: this.name,
			description: this.description,
			stage_id: this.stage_id,
		});
		return taskCreated.data.task;
	}
	public deleteTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public updateTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public async updateStage(): Promise<void> {
		this.validateId(this.stage_id, "stage_id");
		this.validateId(this.id, "id");
		const updateBody: PatchTaskBody = {
			id: this.id,
			stage_id: this.stage_id,
		};
		await axiosInstance.patch("/tasks", updateBody);
	}
	public async getTasks(projectId: number): Promise<TTask> {
		const tasksResponse = await axiosInstance.get<GetTaskResponse>("/tasks", {
			params: { projectId },
		});
		return tasksResponse.data.tasks;
	}
}
