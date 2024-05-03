import { ensureSuperTokensInit } from "@/config/backend";
import { IStage } from "@/models/stage/Stage";
import StageBackend from "@/models/stage/StageBackend";
import { NextRequest, NextResponse } from "next/server";

ensureSuperTokensInit();

export default async function name(req: NextRequest) {
	const projectId = req.nextUrl.searchParams.get("projectId");
	try {
		if (!projectId) {
			return NextResponse.json(
				{
					error: true,
				},
				{ status: 400 }
			);
		}
		const StageBack = new StageBackend();
		StageBack.project_id = Number(projectId);
		const stages = await StageBack.getStages();

		return NextResponse.json<GetStagesResponse>(
			{
				error: false,
				stages,
			},
			{ status: 200 }
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		return NextResponse.json<GetStagesResponse>(
			{
				error: true,
				stages: [],
			},
			{ status: 500 }
		);
	}
}

export interface GetStagesResponse {
	error: boolean;
	stages: IStage[];
}
