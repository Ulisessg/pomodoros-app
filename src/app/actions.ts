"use server";
// Nextjs rediects

import { redirect } from "next/navigation";

export async function redirectToProjectCreated(projectId: number) {
	redirect(`/project/${projectId}`);
}
