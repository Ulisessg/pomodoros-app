import { ITask } from "@/models/task/Task";
import TaskBackend from "@/models/task/TaskBackend";
import { ValidationError, ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
	try {
		const body: ITask = await req.json();
		const Task = new TaskBackend();

		Task.name = body.name;
		Task.description = body.description;
		Task.stage_id = body.stage_id;
		// TEMPORAL day id, default monday
		Task.day_id = 1;

		const taskCreated = await Task.addTask();

		return NextResponse.json<CreateTaskResponse>(
			{
				error: false,
				task: taskCreated,
			},
			{ status: 201 }
		);
	} catch (error) {
		if (
			error instanceof SyntaxError ||
			error instanceof ValidationError ||
			error instanceof ValidationTypeError
		) {
			return NextResponse.json<CreateTaskResponse>(
				{
					error: true,
					task: {} as unknown as any,
				},
				{ status: 400 }
			);
		}
		return NextResponse.json<CreateTaskResponse>(
			{
				error: true,
				task: {} as unknown as any,
			},
			{ status: 500 }
		);
	}
}

export interface CreateTaskResponse {
	error: boolean;
	task: ITask;
}

export interface CreateTaskBody
	extends Omit<ITask, "id" | "start_date" | "day_id"> {}
