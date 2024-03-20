import { Tables } from "@/Types";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "pomodoros";

export default abstract class Pomodoro implements IPomodoro {
	private _id: number = NaN;
	private _name: string = "";
	private _duration: string = "";
	private _rest_duration: string = "";
	private _task_id: number = NaN;

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
	public get duration(): string {
		return this._duration;
	}
	public set duration(value: string) {
		this._duration = value;
	}
	public get rest_duration(): string {
		return this._rest_duration;
	}
	public set rest_duration(value: string) {
		this._rest_duration = value;
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

	public abstract addPomodoro(): Promise<IPomodoro>;
	public abstract deletePomodoro(): Promise<IPomodoro>;
	public abstract updatePomodoro(): Promise<IPomodoro>;
	public abstract getPomodoros(): Promise<Array<IPomodoro>>;
}

export interface IPomodoro {
	id: number;
	name: string;
	// 00:00:00
	duration: string;
	// 00:00:00
	rest_duration: string;
	task_id: number;
}
