import mariaDbPool from "@/utils/mariaDbPool";
import Task, { ITask } from "./Task";
import { TTask } from "@/context/TaskCtx/TaskCtx";

export default class TaskBackend extends Task {
	constructor() {
		super();
	}
	public async addTask(): Promise<ITask> {
		const connection = await mariaDbPool.getConnection();
		try {
			const taskCreated: ITask[] = await connection.query(
				`INSERT INTO tasks 
					(id, name, description, start_date, stage_id, day_id)
					VALUES (?,?,?,?,?,?) 
					RETURNING id, name, description, start_date, stage_id, day_id`,
				[
					null,
					this.name,
					this.description,
					this.start_date,
					this.stage_id,
					this.day_id,
				]
			);
			return taskCreated[0];
		} catch (error) {
			throw new Error("Error Creating Task", { cause: error });
		} finally {
			await connection.end();
		}
	}
	public deleteTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public updateTask(): Promise<ITask> {
		throw new Error("Method not implemented.");
	}
	public async getTasks(projectId: number): Promise<TTask> {
		if (!Number.isInteger(projectId)) throw new TypeError("Invalid projectId");
		const connection = await mariaDbPool.getConnection();
		try {
			const tasksGroupedByStageId: TTask = {};
			const stagesIdsResult: [{ stages_ids: number[] }] =
				await connection.query(
					`SELECT
				JSON_ARRAYAGG(stages.id) AS stages_ids
				FROM stages 
				WHERE stages.project_id = ?
			`,
					[projectId]
				);
			const stagesIds = stagesIdsResult[0].stages_ids;
			for (const stageId of stagesIds) {
				const tasks: ITask[] = await connection.query(
					"SELECT * FROM tasks WHERE tasks.stage_id = ?",
					[stageId]
				);
				tasksGroupedByStageId[Number(stageId)] = tasks;
			}
			return tasksGroupedByStageId;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	public async updateStage(): Promise<void> {
		const connection = await mariaDbPool.getConnection();
		try {
			connection.query("UPDATE tasks SET stage_id = ? WHERE tasks.id = ?", [
				this.stage_id,
				this.id,
			]);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
}
