import ProjectBackend from "@/models/project/ProjectBackend";
import UserBackend from "@/models/user/UserBackend";
import UserError from "@/models/user/UserError";
import { NextRequest, NextResponse } from "next/server";
import { GetProjectsResponse } from "./route";
import { ensureSuperTokensInit } from "@/config/backend";
import { withSession } from "supertokens-node/nextjs";
import {
	BadRequestResponse,
	ServerErrorResponse,
	UnAuthorizedResponse,
} from "@/apiConstants";

ensureSuperTokensInit();

export default async function GET(request: NextRequest) {
	return withSession(request, async (err, session) => {
		if (err) return ServerErrorResponse;
		if (!session) return UnAuthorizedResponse;
		const userId = session.getUserId();
		try {
			const User = new UserBackend();

			User.user_id = userId;

			const userIsRegisteredInPomodorosDb =
				await User.validateUserIsRegisteredInPomodorosDb();

			if (!userIsRegisteredInPomodorosDb) {
				const userData = await User.getUser();
				User.user_name = userData.user_name;
				// The user is not registered in database so there are no projects associated with them
				await User.addUser();

				return NextResponse.json<GetProjectsResponse>({
					error: false,
					projects: [],
				});
			}

			const Project = new ProjectBackend();
			Project.user_id = userId;

			const projects = await Project.getProjects();

			return NextResponse.json<GetProjectsResponse>({
				error: false,
				projects: projects,
			});
		} catch (error) {
			// User validations or empty params
			if (error instanceof UserError || error instanceof TypeError) {
				return BadRequestResponse<GetProjectsResponse>({
					error: true,
					projects: [],
				});
			}
			// log server error

			// eslint-disable-next-line no-console
			console.log(error);
			return ServerErrorResponse;
		}
	});
}
