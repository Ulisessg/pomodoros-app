import { Tables } from "@/Types";
import TableValidations from "../TableValidations";
import { TimeRegex } from "@/utils/regex";
import {
	ValidationError,
	ValidationTypeError,
} from "@/models/TableValidations";

const table: Tables = "pomodoros";

export default abstract class Pomodoro
	extends TableValidations
	implements IPomodoro
{
	private _id: number = NaN;
	private _title: string = "";
	private _duration: string = "";
	private _rest_duration: string = "";
	private _task_id: number = NaN;
	private _pomodoro_stopped_at: string = "";

	private _rest_stopped_at: string = "";

	constructor() {
		super(table);
	}

	public get pomodoro_stopped_at(): string {
		return this._pomodoro_stopped_at;
	}
	public set pomodoro_stopped_at(value: string) {
		this.validateDuration(value);
		this._pomodoro_stopped_at = value;
	}

	public get rest_stopped_at(): string {
		return this._rest_stopped_at;
	}
	public set rest_stopped_at(value: string) {
		this._rest_stopped_at = value;
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
			throw new ValidationTypeError("Duration must be string");
		if (duration.match(TimeRegex) === null) {
			throw new Error("Bad time format");
		}
	}
	public validateType(type: TPomodoroTypes) {
		if (typeof type !== "string") {
			throw new ValidationTypeError("Invalid type, must be string type");
		}
		if (type !== "rest" && type !== "pomodoro") {
			throw new ValidationError('Types allowed: "pomodoro" | "rest"');
		}
	}

	public abstract addPomodoro(): Promise<IPomodoro>;
	public abstract deletePomodoro(): Promise<IPomodoro>;
	public abstract updatePomodoro(): Promise<IPomodoro>;
	public abstract getPomodoros(): Promise<Array<IPomodoro>>;
	// eslint-disable-next-line no-unused-vars
	public abstract updateStoppedAt(type: TPomodoroTypes): Promise<void>;
}

export interface IPomodoro {
	id: number;
	title: string;
	// 00:00:00
	duration: string;
	// 00:00:00
	rest_duration: string;
	// 00:00:00
	pomodoro_stopped_at: string;
	// 00:00:00
	rest_stopped_at: string;
	task_id: number;
}

export type TPomodoroTypes = "pomodoro" | "rest";
