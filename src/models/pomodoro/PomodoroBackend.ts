import mariaDbPool from "@/databaseConnectors/mariaDbPool";
import Pomodoro, { IPomodoro, TPomodoroTypes } from "./Pomodoro";

export default class PomodoroBackend extends Pomodoro {
	constructor() {
		super();
	}

	public async updateStoppedAt(type: TPomodoroTypes): Promise<void> {
		const connection = await mariaDbPool.getConnection();

		try {
			this.validateId(this.id, "pomodoro id");
			this.validateType(type);

			let updateQueryString = "";
			let stoppedAt;
			if (type === "pomodoro") {
				this.validateDuration(this.pomodoro_stopped_at);
				stoppedAt = this.pomodoro_stopped_at;
				updateQueryString =
					"UPDATE pomodoros SET pomodoro_stopped_at = ? WHERE id = ?";
			} else if (type === "rest") {
				this.validateDuration(this.rest_stopped_at);
				stoppedAt = this.rest_stopped_at;
				updateQueryString =
					"UPDATE pomodoros SET rest_stopped_at = ? WHERE id = ?";
			}

			await connection.query(updateQueryString, [stoppedAt, this.id]);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	public async addPomodoro(): Promise<IPomodoro> {
		const connection = await mariaDbPool.getConnection();
		try {
			const pomodoroCreated: [IPomodoro] = await connection.query(
				`INSERT INTO pomodoros 
					(id, title, duration, rest_duration, task_id) 
					VALUES (?,?,?,?,?) 
				RETURNING id, title, duration, rest_duration, pomodoro_stopped_at, rest_stopped_at, task_id`,
				[null, this.title, this.duration, this.rest_duration, this.task_id]
			);

			return pomodoroCreated[0];
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	public deletePomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public updatePomodoro(): Promise<IPomodoro> {
		throw new Error("Method not implemented.");
	}
	public async getPomodoros(): Promise<IPomodoro[]> {
		const connection = await mariaDbPool.getConnection();

		try {
			const pomodoros: IPomodoro[] = await connection.query(
				"SELECT * FROM pomodoros  WHERE  task_id  = ?",
				[this.task_id]
			);
			return pomodoros;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
}
