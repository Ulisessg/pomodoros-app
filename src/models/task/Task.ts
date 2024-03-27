import { Tables } from "@/Types";
import { TTask } from "@/context/TaskCtx/TaskCtx";
import TableValidations from "../TableValidations";

const table: Tables = "tasks";

export default abstract class Task extends TableValidations implements ITask {
	private _id: number = NaN;
	private _name: string = "";
	private _description = "";
	private _start_date: string = new Date()
		.toISOString()
		// Match mariadb date time format
		.slice(0, 19)
		.replace("T", " ");
	private _stage_id: number = NaN;
	private _day_id: number = NaN;

	constructor() {
		super(table);
	}

	public get day_id(): number {
		return this._day_id;
	}
	public set day_id(value: number) {
		this.validateId(value, "day_id");
		this._day_id = value;
	}

	public get stage_id(): number {
		return this._stage_id;
	}
	public set stage_id(value: number) {
		this.validateId(value, "stage_id");
		this._stage_id = value;
	}

	public get start_date(): string {
		return this._start_date;
	}

	public get description() {
		return this._description;
	}
	public set description(value) {
		if (typeof value !== "string") {
			throw new TypeError("String type required, even if description is empty");
		}
		this._description = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this.validateName(value, 50, "name");
		this._name = value;
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this.validateId(value, "id");
		this._id = value;
	}
	public abstract addTask(): Promise<ITask>;
	public abstract deleteTask(): Promise<ITask>;
	public abstract updateTask(): Promise<ITask>;
	// eslint-disable-next-line no-unused-vars
	public abstract getTasks(projectId: number): Promise<TTask>;
	// Patch so no response required
	public abstract updateStage(): Promise<void>;
}

export interface ITask {
	id: number;
	name: string;
	description: string;
	start_date: string;
	stage_id: number;
	day_id: number;
}
