import { BadRequestResponse, ServerErrorResponse } from "@/apiConstants";
import { ensureSuperTokensInit } from "@/config/backend";
import {
	ValidationError,
	ValidationTypeError,
} from "@/models/TableValidations";
import { ITask } from "@/models/task/Task";
import TaskBackend from "@/models/task/TaskBackend";
import { NextRequest, NextResponse } from "next/server";

ensureSuperTokensInit();

export default async function PUT(req: NextRequest) {
	try {
		const { day_id, description, id, name, stage_id }: PutTaskRequestBody =
			await req.json();
		const TaskBack = new TaskBackend();
		TaskBack.day_id = day_id;
		TaskBack.description = description;
		TaskBack.id = id;
		TaskBack.name = name;
		TaskBack.stage_id = stage_id;
		const updatedTask = await TaskBack.updateTask();
		return NextResponse.json(updatedTask, { status: 200 });
	} catch (error) {
		if (
			error instanceof ValidationError ||
			error instanceof ValidationTypeError
		) {
			return BadRequestResponse(null);
		}
		// eslint-disable-next-line no-console
		console.log(error);
		return ServerErrorResponse;
	}
}

export interface PutTaskRequestBody extends Omit<ITask, "start_date"> {}
