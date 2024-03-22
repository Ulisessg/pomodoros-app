import ProjectBackend from "@/models/project/ProjectBackend";
import UserBackend from "@/models/user/UserBackend";
import UserError from "@/models/user/UserError";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { GetProjectsResponse } from "./route";

export default async function GET(request: NextRequest) {
	try {
		const res = new NextResponse();
		const session = (await getSession(request, res)) as Session;
		const nickName = session.user.nickname;

		const User = new UserBackend();
		User.name = nickName;
		const userData = await User.getUser();

		if (userData === undefined) {
			// The user is not registered in database so there are no projects associated with them
			const userCreated = await User.addUser();
			User.id = userCreated.id;
			return NextResponse.json<GetProjectsResponse>({
				error: false,
				projects: [],
				userId: userCreated.id,
			});
		}

		User.id = userData.id;
		const Project = new ProjectBackend();
		Project.user_id = User.id;

		const userProjects = await Project.getProjects();

		return NextResponse.json<GetProjectsResponse>({
			error: false,
			projects: userProjects,
			userId: User.id,
		});
	} catch (error) {
		// User validations or empty params
		if (error instanceof UserError || error instanceof TypeError) {
			return NextResponse.json<GetProjectsResponse>(
				{
					error: true,
					projects: [],
					userId: NaN,
				},
				{ status: 400 }
			);
		}
		return NextResponse.json<GetProjectsResponse>(
			{
				error: true,
				projects: [],
				userId: NaN,
			},
			{ status: 500 }
		);
	}
}
