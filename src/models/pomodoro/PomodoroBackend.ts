import mariaDbPool from "@/databaseConnectors/mariaDbPool";
import Pomodoro, { IPomodoro } from "./Pomodoro";

export default class PomodoroBackend extends Pomodoro {
	public async addPomodoro(): Promise<IPomodoro> {
		const connection = await mariaDbPool.getConnection();
		try {
			const pomodoroCreated: [IPomodoro] = await connection.query(
				`INSERT INTO pomodoros 
					(id, title, duration, rest_duration, task_id) 
					VALUES (?,?,?,?,?) 
				RETURNING id, title, duration, rest_duration, task_id`,
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
