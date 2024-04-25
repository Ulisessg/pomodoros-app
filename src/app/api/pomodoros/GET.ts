import { ensureSuperTokensInit } from "@/config/backend";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import PomodoroBackend from "@/models/pomodoro/PomodoroBackend";
import { ValidationError, ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";

ensureSuperTokensInit();

export default async function GET(req: NextRequest) {
	try {
		const taskId = Number(req.nextUrl.searchParams.get("taskId"));

		const pomodoroBack = new PomodoroBackend();
		pomodoroBack.task_id = taskId;
		const pomodoros = await pomodoroBack.getPomodoros();

		return NextResponse.json<GetPomodorosResponse>({
			error: false,
			pomodoros: pomodoros,
		});
	} catch (error) {
		if (
			error instanceof ValidationTypeError ||
			error instanceof ValidationError
		) {
			return NextResponse.json<GetPomodorosResponse>(
				{
					error: true,
					pomodoros: [],
				},
				{ status: 400 }
			);
		}
	}
}

export interface GetPomodorosResponse {
	error: boolean;
	pomodoros: IPomodoro[];
}
