import Pomodoro, { IPomodoro } from "./Pomodoro";
import { GetPomodorosResponse } from "@/app/api/pomodoros/GET";
import {
	CreatePomodoroBody,
	CreatePomodoroResponse,
} from "@/app/api/pomodoros/POST";
import axiosInstance from "@/utils/axiosInstance";

export default class PomodoroFrontend extends Pomodoro {
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
