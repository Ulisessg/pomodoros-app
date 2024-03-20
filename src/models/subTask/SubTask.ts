import { Tables } from "@/Types";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "subtasks";

export default abstract class SubTask implements ISubTask {
	private _task_id: number = NaN;
	private _description: string = "";
	private _name: string = "";
	private _id: number = NaN;

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		idValidations({
			id: value,
			table,
		});
		this._id = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		nameValidations({
			maxNameSize: 50,
			name: value,
			table,
		});
		this._name = value;
	}

	public get description(): string {
		return this._description;
	}
	public set description(value: string) {
		if (typeof value !== "string") {
			throw new Error("Description must be string type, even if is empty");
		}
		this._description = value;
	}

	public get task_id(): number {
		return this._task_id;
	}
	public set task_id(value: number) {
		idValidations({
			id: value,
			table,
			extraMessage: "task_id",
		});
		this._task_id = value;
	}
	public abstract addSubTask(): Promise<ISubTask>;
	public abstract deleteSubTask(): Promise<ISubTask>;
	public abstract updateSubTask(): Promise<ISubTask>;
	public abstract getSubTasks(): Promise<Array<ISubTask>>;
}

export interface ISubTask {
	id: number;
	name: string;
	description: string;
	task_id: number;
}
