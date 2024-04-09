import ProjectBackend from "@/models/project/ProjectBackend";
import UserBackend from "@/models/user/UserBackend";
import UserError from "@/models/user/UserError";
import { NextRequest, NextResponse } from "next/server";
import { GetProjectsResponse } from "./route";
import { ensureSuperTokensInit } from "@/config/backend";
import apiGetUserId, { GetUserIdError } from "@/utils/apiGetUserId";

ensureSuperTokensInit();

export default async function GET(request: NextRequest) {
	try {
		const user_id = apiGetUserId(request);
		const User = new UserBackend();

		User.user_id = user_id;

		const userIsRegisteredInPomodorosDb =
			await User.validateUserIsRegisteredInPomodorosDb();

		if (!userIsRegisteredInPomodorosDb) {
			// The user is not registered in database so there are no projects associated with them
			await User.addUser();

			return NextResponse.json<GetProjectsResponse>({
				error: false,
				projects: [],
			});
		}

		const Project = new ProjectBackend();
		Project.user_id = user_id;

		const projects = await Project.getProjects();

		return NextResponse.json<GetProjectsResponse>({
			error: false,
			projects: projects,
		});
	} catch (error) {
		const commonErrorResponse: GetProjectsResponse = {
			error: true,
			projects: [],
		};
		// User validations or empty params
		if (error instanceof UserError || error instanceof TypeError) {
			return NextResponse.json<GetProjectsResponse>(commonErrorResponse, {
				status: 400,
			});
		}

		if (error instanceof GetUserIdError) {
			return NextResponse.json<GetProjectsResponse>(commonErrorResponse);
		}
		return NextResponse.json<GetProjectsResponse>(commonErrorResponse, {
			status: 500,
		});
	}
}
