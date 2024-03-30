import { Tables } from "@/Types";
import TableValidations from "../TableValidations";
import { TimeRegex } from "@/utils/regex";

const table: Tables = "pomodoros";

export default abstract class task_idPomodoro
	extends TableValidations
	implements IPomodoro
{
	private _id: number = NaN;
	private _title: string = "";
	private _duration: string = "";
	private _rest_duration: string = "";
	private _task_id: number = NaN;

	constructor() {
		super(table);
	}

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this.validateId(value, "id");
		this._id = value;
	}
	public get title(): string {
		return this._title;
	}
	public set title(value: string) {
		this.validateName(value, 50, "title", 0);
		this._title = value;
	}
	public get duration(): string {
		return this._duration;
	}
	public set duration(value: string) {
		this.validateDuration(value);
		this._duration = value;
	}
	public get rest_duration(): string {
		return this._rest_duration;
	}
	public set rest_duration(value: string) {
		this.validateDuration(value);
		this._rest_duration = value;
	}

	public get task_id(): number {
		return this._task_id;
	}
	public set task_id(value: number) {
		this.validateId(value, "task_id");
		this._task_id = value;
	}

	public validateDuration(duration: string) {
		if (typeof duration !== "string")
			throw new TypeError("Duration must be string");
		if (duration.match(TimeRegex) === null) {
			throw new Error("Bad time format");
		}
	}

	public abstract addPomodoro(): Promise<IPomodoro>;
	public abstract deletePomodoro(): Promise<IPomodoro>;
	public abstract updatePomodoro(): Promise<IPomodoro>;
	public abstract getPomodoros(): Promise<Array<IPomodoro>>;
}

export interface IPomodoro {
	id: number;
	title: string;
	// 00:00:00
	duration: string;
	// 00:00:00
	rest_duration: string;
	task_id: number;
}
