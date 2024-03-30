"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function useGetTaskDataFromUrl(): UseGetTaskDataFromUrlReturn {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	if (pathName !== "/task") {
		throw new Error("Path invalid, you must be in /task route");
	}

	const project = Number(searchParams.get("project"));
	const stage = Number(searchParams.get("stage"));
	const task = Number(searchParams.get("task"));

	if (!Number.isInteger(project)) throw new Error("Invalid project");
	if (!Number.isInteger(stage)) throw new Error("Invalid stage");
	if (!Number.isInteger(task)) throw new Error("Invalid task");

	return {
		project,
		stage,
		task,
	};
}

interface UseGetTaskDataFromUrlReturn {
	project: number;
	stage: number;
	task: number;
}
