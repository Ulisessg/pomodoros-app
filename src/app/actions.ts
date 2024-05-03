"use server";
// Nextjs rediects

import { redirect } from "next/navigation";

export async function redirectToProjectCreated(projectId: number) {
	redirect(`/project/${projectId}`);
}

export async function redirectToEditStages(projectId: number) {
	if (!Number.isInteger(projectId)) throw new TypeError("Invalid project id");
	redirect(`/project/${projectId}/settings/edit-stages`);
}
