import {
	BadRequestResponse,
	DeletedResponse,
	ServerErrorResponse,
} from "@/apiConstants";
import { ensureSuperTokensInit } from "@/config/backend";
import StageBackend from "@/models/stage/StageBackend";
import {
	ValidationError,
	ValidationTypeError,
} from "@/models/TableValidations";
import { NextRequest } from "next/server";

ensureSuperTokensInit();

export default async function DELETE(req: NextRequest) {
	try {
		const body: DeleteStageBody = await req.json();
		const StageBack = new StageBackend();
		StageBack.id = body.stageId;
		await StageBack.deleteStage();
		return DeletedResponse;
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

export interface DeleteStageBody {
	stageId: number;
}
