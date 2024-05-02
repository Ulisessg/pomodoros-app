import PomodoroFrontend from "@/models/pomodoro/PomodoroFrontend";

/**
 * Param format: 00:00:00
 * @param str
 * @returns number
 */
export default function convertTimeInSeconds(time: string): number {
	try {
		const pomodoro = new PomodoroFrontend();
		// Validate time format
		pomodoro.duration = time;
		const epoch = new Date(`Thu, 01 Jan 1970 ${time} GMT`);
		const seconds = epoch.getTime() / 1000;

		return seconds;
	} catch (error) {
		throw error;
	}
}
