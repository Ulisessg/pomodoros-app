import { IProject } from "@/models/project/Project";
import ProjectBackend from "@/models/project/ProjectBackend";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
	try {
		const body: IProject = await req.json();
		const Project = new ProjectBackend();
		Project.name = body.name;
		Project.description = body.description;
		Project.user_id = body.user_id;

		const projectCreated = await Project.addProject();

		return NextResponse.json(projectCreated, { status: 200 });
	} catch (error) {
		const err = error as Error;
		if (err.message === 'Project exists"') {
			return NextResponse.json<CreateProjectResponse>(
				{
					error: true,
					project: {} as unknown as any,
				},
				{ status: 409 }
			);
		}
		return NextResponse.json<CreateProjectResponse>(
			{
				error: true,
				project: {} as unknown as any,
			},
			{ status: 400 }
		);
	}
}

export interface CreateProjectResponse {
	error: boolean;
	project: IProject;
}
