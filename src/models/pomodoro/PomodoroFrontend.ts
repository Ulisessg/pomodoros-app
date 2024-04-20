import Pomodoro, { IPomodoro, TPomodoroTypes } from "./Pomodoro";
import { GetPomodorosResponse } from "@/app/api/pomodoros/GET";
import { PatchPomodoroBody } from "@/app/api/pomodoros/PATCH";
import {
	CreatePomodoroBody,
	CreatePomodoroResponse,
} from "@/app/api/pomodoros/POST";
import axiosInstance from "@/utils/axiosInstance";

export default class PomodoroFrontend extends Pomodoro {
	private _project_id: number = NaN;

	constructor() {
		super();
	}
	public get project_id(): number {
		return this._project_id;
	}
	public set project_id(value: number) {
		this.validateId(value, "project_id");
		this._project_id = value;
	}

	public async updateStoppedAt(type: TPomodoroTypes): Promise<void> {
		this.validateId(this.id, "pomodoro id");
		this.validateId(this.project_id, "project_id");
		let stoppedAt;
		if (type === "pomodoro") {
			stoppedAt = this.pomodoro_stopped_at;
		} else {
			stoppedAt = this.rest_stopped_at;
		}
		this.validateDuration(stoppedAt);
		this.validateType(type);

		const body: PatchPomodoroBody = {
			pomodoroId: this.id,
			projectId: this._project_id,
			stopped_at: stoppedAt,
			type: type,
		};

		await axiosInstance.patch("/pomodoros", body);
	}
	public async addPomodoro(): Promise<IPomodoro> {
		const pomodoroCreated = await axiosInstance.post<CreatePomodoroResponse>(
			"/pomodoros",
			{
				duration: this.duration,
				title: this.title,
				rest_duration: this.rest_duration,
				task_id: this.task_id,
			} as CreatePomodoroBody
		);
		return pomodoroCreated.data.pomodoro;
	}
	public deletePomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public updatePomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public async getPomodoros(): Promise<IPomodoro[]> {
		const pomodoros = await axiosInstance.get<GetPomodorosResponse>(
			"/pomodoros",
			{
				params: {
					taskId: this.task_id,
				},
			}
		);
		return pomodoros.data.pomodoros;
	}
}
