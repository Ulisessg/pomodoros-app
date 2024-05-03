import { Tables } from "@/Types";
import TableValidations from "@/models/TableValidations";

const table: Tables = "subtasks";

export default abstract class SubTask
	extends TableValidations
	implements ISubTask
{
	private _task_id: number = NaN;
	private _description: string = "";
	private _name: string = "";
	private _id: number = NaN;
	constructor() {
		super(table);
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this.validateId(value, "Set id");
		this._id = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this.validateName(value, 50, "Set name", 3);

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
		this.validateId(value, "set task_id");
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
