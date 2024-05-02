import { ensureSuperTokensInit } from "@/config/backend";
import { IStage } from "@/models/stage/Stage";
import StageBackend from "@/models/stage/StageBackend";
import { ValidationError, ValidationTypeError } from "@/utils/tableValidations";
import { NextRequest, NextResponse } from "next/server";

ensureSuperTokensInit();

export default async function POST(req: NextRequest) {
	try {
		(BigInt.prototype as any).toJSON = function () {
			return this.toString();
		};
		const body: UpdateWorkFlowBody = await req.json();
		const StageBack = new StageBackend();
		await StageBack.updateWorkFlow(body.stages);
		return NextResponse.json(null, { status: 201 });
	} catch (error) {
		if (
			error instanceof ValidationError ||
			error instanceof ValidationTypeError
		) {
			return NextResponse.json(null, { status: 400 });
		}

		// eslint-disable-next-line no-console
		console.log(error);
		return NextResponse.json(null, { status: 500 });
	}
}

export interface UpdateWorkFlowBody {
	stages: IStage[];
}
