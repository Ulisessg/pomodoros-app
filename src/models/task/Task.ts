import { Tables } from "@/Types";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "tasks";

export default abstract class Task implements ITask {
	private _id: number = NaN;
	private _name: string = "";
	private _description = "";
	private _start_date: Date = new Date();
	private _stage_id: number = NaN;
	private _day_id: number = NaN;

	public get day_id(): number {
		return this._day_id;
	}
	public set day_id(value: number) {
		idValidations({
			id: value,
			table,
			extraMessage: "day_id",
		});
		this._day_id = value;
	}

	public get stage_id(): number {
		return this._stage_id;
	}
	public set stage_id(value: number) {
		idValidations({
			id: value,
			table,
			extraMessage: "stage_id",
		});
		this._stage_id = value;
	}

	public get start_date(): Date {
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
		nameValidations({
			maxNameSize: 50,
			name: value,
			table,
		});
		this._name = value;
	}
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

	public abstract addTask(): Promise<ITask>;
	public abstract deleteTask(): Promise<ITask>;
	public abstract updateTask(): Promise<ITask>;
	public abstract getTasks(): Promise<Array<ITask>>;
}

export interface ITask {
	id: number;
	name: string;
	description: string;
	start_date: Date;
	stage_id: number;
	day_id: number;
}
