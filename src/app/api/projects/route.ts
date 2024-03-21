import { IProject } from "@/models/project/Project";
import ProjectBackend from "@/models/project/ProjectBackend";
import UserBackend from "@/models/user/UserBackend";
import UserError from "@/models/user/UserError";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const res = new NextResponse();
		const session = (await getSession(request, res)) as Session;
		const nickName = session.user.nickname;

		const User = new UserBackend();
		User.name = nickName;
		const userData = await User.getUser();

		if (userData === undefined) {
			// The user is not registered in database so there are no projects associated with them
			await User.addUser();

			return NextResponse.json<NextGetProjectResponse>({
				error: false,
				projects: [],
			});
		}

		User.id = userData.id;

		const Project = new ProjectBackend();
		Project.user_id = User.id;

		const userProjects = await Project.getProjects();

		return NextResponse.json<NextGetProjectResponse>({
			error: false,
			projects: userProjects,
		});
	} catch (error) {
		// User validations or empty params
		if (error instanceof UserError || error instanceof TypeError) {
			return NextResponse.json<NextGetProjectResponse>(
				{
					error: true,
					projects: [],
				},
				{ status: 400 }
			);
		}
		return NextResponse.json<NextGetProjectResponse>(
			{
				error: true,
				projects: [],
			},
			{ status: 500 }
		);
	}
}

interface NextGetProjectResponse {
	error: boolean;
	projects: IProject[];
}
