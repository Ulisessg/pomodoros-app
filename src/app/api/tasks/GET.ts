import { TTask } from "@/context/TaskCtx/TaskCtx";
import TaskBackend from "@/models/task/TaskBackend";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
	try {
		const projectId = Number(req.nextUrl.searchParams.get("projectId"));
		if (!Number.isInteger(projectId))
			throw new TypeError("Project id must be integer number");
		const taskBack = new TaskBackend();
		const tasksGroupedByStageId = await taskBack.getTasks(projectId);
		return NextResponse.json<GetTaskResponse>(
			{
				error: false,
				tasks: tasksGroupedByStageId,
			},
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof TypeError) {
			return NextResponse.json<GetTaskResponse>(
				{
					error: true,
					tasks: {},
				},
				{ status: 400 }
			);
		}
		return NextResponse.json<GetTaskResponse>(
			{
				error: true,
				tasks: {},
			},
			{ status: 500 }
		);
	}
}

export interface GetTaskResponse {
	error: boolean;
	tasks: TTask;
}
