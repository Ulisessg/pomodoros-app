import { NextResponse } from "next/server";

export const UnAuthorizedResponse = NextResponse.json(null, { status: 401 });

export const ServerErrorResponse = NextResponse.json(null, { status: 500 });

export const BadRequestResponse = <T>(body: T) =>
	NextResponse.json<T>(body, { status: 400 });

export const DeletedResponse = new NextResponse(undefined, { status: 204 });
