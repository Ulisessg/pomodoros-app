import { IStage } from "@/models/stage/Stage";
import StageBackend from "@/models/stage/StageBackend";
import { NextRequest, NextResponse } from "next/server";

export default async function name(req: NextRequest) {
	const res = new NextResponse();
	const session = await getSession(req, res);

	if (!session?.user) {
		return NextResponse.redirect("/api/auth");
	}

	try {
		const projectId = req.nextUrl.searchParams.get("projectId");
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
