import Pomodoro, { IPomodoro } from "./Pomodoro";

export default class PomodoroFrontend extends Pomodoro {
	public addPomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public deletePomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public updatePomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public getPomodoros(): Promise<IPomodoro[]> {
		throw new Error("Method not implemented.");
	}
}
