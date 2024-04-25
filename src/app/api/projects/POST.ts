import { ensureSuperTokensInit } from "@/config/backend";
import { IProject } from "@/models/project/Project";
import ProjectBackend from "@/models/project/ProjectBackend";
import { IStage } from "@/models/stage/Stage";
import StageBackend from "@/models/stage/StageBackend";
import { NextRequest, NextResponse } from "next/server";

ensureSuperTokensInit();

export default async function POST(req: NextRequest) {
	try {
		const body: IProject = await req.json();

		const Project = new ProjectBackend();
		Project.name = body.name;
		Project.description = body.description;
		Project.user_id = body.user_id;

		const projectCreated = await Project.addProject();

		const Stages = new StageBackend();

		const BacklogStage = new StageBackend();
		BacklogStage.name = "Backlog";
		BacklogStage.color = "0c4b8e";
		BacklogStage.project_id = projectCreated.id;

		const WorkingOnStage = new StageBackend();
		WorkingOnStage.name = "Working On";
		WorkingOnStage.color = "ecf7fe";
		WorkingOnStage.project_id = projectCreated.id;

		const DoneStage = new StageBackend();
		DoneStage.name = "Done";
		DoneStage.color = "189bfa";
		DoneStage.project_id = projectCreated.id;

		const defaultStagesCreated = await Stages.addStages([
			BacklogStage,
			WorkingOnStage,
			DoneStage,
		]);
		return NextResponse.json<CreateProjectResponse>(
			{ error: false, project: projectCreated, stages: defaultStagesCreated },
			{
				status: 201,
			}
		);
	} catch (error) {
		const err = error as Error;
		if (err.message === 'Project exists"') {
			return NextResponse.json<CreateProjectResponse>(
				{
					error: true,
					project: {} as unknown as any,
					stages: [],
				},
				{ status: 409 }
			);
		}
		return NextResponse.json<CreateProjectResponse>(
			{
				error: true,
				project: {} as unknown as any,
				stages: [],
			},
			{ status: 400 }
		);
	}
}

export interface CreateProjectResponse {
	error: boolean;
	project: IProject;
	stages: IStage[];
}
