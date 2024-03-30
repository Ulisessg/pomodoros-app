import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import PomodoroBackend from "@/models/pomodoro/PomodoroBackend";
import { ValidationError, ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
	try {
		const body: CreatePomodoroBody = await req.json();
		const pomodoroBack = new PomodoroBackend();
		pomodoroBack.title = body.title;
		pomodoroBack.duration = body.duration;
		pomodoroBack.rest_duration = body.rest_duration;
		pomodoroBack.task_id = body.task_id;
		const pomodoroCreated = await pomodoroBack.addPomodoro();

		return NextResponse.json<CreatePomodoroResponse>({
			error: false,
			pomodoro: pomodoroCreated,
		});
	} catch (error) {
		if (
			error instanceof ValidationError ||
			error instanceof ValidationTypeError
		) {
			return NextResponse.json<CreatePomodoroResponse>(
				{
					error: true,
					pomodoro: {} as any,
				},
				{ status: 400 }
			);
		}
		return NextResponse.json<CreatePomodoroResponse>(
			{
				error: true,
				pomodoro: {} as any,
			},
			{ status: 500 }
		);
	}
}

export interface CreatePomodoroBody extends Omit<IPomodoro, "id"> {}
export interface CreatePomodoroResponse {
	error: boolean;
	pomodoro: IPomodoro;
}
