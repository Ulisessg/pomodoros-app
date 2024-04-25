import { ensureSuperTokensInit } from "@/config/backend";
import TaskBackend from "@/models/task/TaskBackend";
import { ValidationError, ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";

ensureSuperTokensInit();

export default async function PATCH(req: NextRequest) {
	try {
		const body: PatchTaskBody = await req.json();
		const TaskBack = new TaskBackend();
		TaskBack.id = body.id;
		TaskBack.stage_id = body.stage_id;
		await TaskBack.updateStage();
		return new NextResponse(null, { status: 204 });
	} catch (error) {
		if (
			error instanceof ValidationError ||
			error instanceof ValidationTypeError
		) {
			return NextResponse.json(
				{
					error: true,
				},
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{
				error: true,
			},
			{ status: 500 }
		);
	}
}

export interface PatchTaskBody {
	id: number;
	stage_id: number;
}
