import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/config/backend";
import apiGetUserId, { GetUserIdError } from "@/utils/apiGetUserId";
import UserBackend from "@/models/user/UserBackend";
import { IUser } from "@/models/user/User";

ensureSuperTokensInit();

export async function GET(request: NextRequest) {
	try {
		const userId = apiGetUserId(request);
		const user = new UserBackend();
		user.user_id = userId;
		const userData = await user.getUser();
		return NextResponse.json<GetUserResponse>(userData, { status: 200 });
	} catch (error) {
		const commonErrorResponse: GetUserResponse = {
			user_id: "",
			user_name: "",
		};
		if (error instanceof GetUserIdError) {
			return NextResponse.json<GetUserResponse>(commonErrorResponse, {
				status: 401,
			});
		}
		return NextResponse.json<GetUserResponse>(commonErrorResponse, {
			status: 500,
		});
	}
}

export interface GetUserResponse extends IUser {}
