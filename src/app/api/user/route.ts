import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/config/backend";
import UserBackend from "@/models/user/UserBackend";
import { IUser } from "@/models/user/User";
import { withSession } from "supertokens-node/nextjs";
import { ServerErrorResponse, UnAuthorizedResponse } from "@/apiConstants";

ensureSuperTokensInit();

export async function GET(request: NextRequest) {
	return withSession(request, async (err, session) => {
		if (err) return ServerErrorResponse;
		if (!session) return UnAuthorizedResponse;
		const userId = session.getUserId();
		try {
			const user = new UserBackend();
			user.user_id = userId;
			const userData = await user.getUser();
			return NextResponse.json<GetUserResponse>(userData, { status: 200 });
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
			return ServerErrorResponse;
		}
	});
}

export interface GetUserResponse extends IUser {}
