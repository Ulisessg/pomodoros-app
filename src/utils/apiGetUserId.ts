import { NextRequest } from "next/server";

export default function apiGetUserId(request: NextRequest): string {
	const userId = request.headers.get("x-user-id");
	if (userId === null) {
		throw new GetUserIdError("Authentication Required");
	}
	return userId;
}

export class GetUserIdError extends Error {
	constructor(message?: string, options?: ErrorOptions) {
		super(message, options);
	}
}
