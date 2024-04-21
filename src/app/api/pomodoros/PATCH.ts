import { TPomodoroTypes } from "@/models/pomodoro/Pomodoro";
import PomodoroBackend from "@/models/pomodoro/PomodoroBackend";
import ProjectBackend, { errorMessages } from "@/models/project/ProjectBackend";
import apiGetUserId, { GetUserIdError } from "@/utils/apiGetUserId";
import { ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";

export default async function PATCH(req: NextRequest) {
	try {
		const body: PatchPomodoroBody = await req.json();
		const userId = apiGetUserId(req);
		const projectId = body.projectId;

		const { validateProjectBelongsToUser } = new ProjectBackend();
		validateProjectBelongsToUser(userId, projectId);

		const type = body.type;

		const pomodoro = new PomodoroBackend();
		pomodoro.id = body.pomodoroId;
		if (type === "pomodoro") {
			pomodoro.pomodoro_stopped_at = body.stopped_at;
		} else {
			pomodoro.rest_stopped_at = body.stopped_at;
		}

		await pomodoro.updateStoppedAt(body.type);

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		const err = error as Error;

		if (err instanceof ValidationTypeError) {
			return new NextResponse(null, {
				status: 400,
			});
		}

		if (
			err.message === errorMessages.projectNoBelongsToUser ||
			err instanceof GetUserIdError
		) {
			return new NextResponse(null, {
				status: 401,
			});
		}
		return new NextResponse(null, {
			status: 500,
		});
	}
}

export interface PatchPomodoroBody {
	projectId: number;
	pomodoroId: number;
	stopped_at: string;
	type: TPomodoroTypes;
}
