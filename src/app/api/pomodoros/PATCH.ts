import {
	BadRequestResponse,
	ServerErrorResponse,
	UnAuthorizedResponse,
} from "@/apiConstants";
import { ensureSuperTokensInit } from "@/config/backend";
import { TPomodoroTypes } from "@/models/pomodoro/Pomodoro";
import PomodoroBackend from "@/models/pomodoro/PomodoroBackend";
import ProjectBackend, { errorMessages } from "@/models/project/ProjectBackend";
import { ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";
import { withSession } from "supertokens-node/nextjs";

ensureSuperTokensInit();

export default async function PATCH(req: NextRequest) {
	return withSession(req, async (err, session) => {
		if (err) return ServerErrorResponse;
		if (!session) return UnAuthorizedResponse;
		try {
			const userId = session.getUserId();
			const body: PatchPomodoroBody = await req.json();
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
				return BadRequestResponse(null);
			}

			if (err.message === errorMessages.projectNoBelongsToUser) {
				return UnAuthorizedResponse;
			}
			// eslint-disable-next-line no-console
			console.log(err);
			return ServerErrorResponse;
		}
	});
}

export interface PatchPomodoroBody {
	projectId: number;
	pomodoroId: number;
	stopped_at: string;
	type: TPomodoroTypes;
}
