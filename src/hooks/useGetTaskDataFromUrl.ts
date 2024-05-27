"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function useGetTaskDataFromUrl(
  withValidations: boolean = true
): UseGetTaskDataFromUrlReturn {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const projectId = Number(searchParams.get("project"));
  const stageId = Number(searchParams.get("stage"));
  const taskId = Number(searchParams.get("task"));
  const taskIndex = Number(searchParams.get("index"));
  if (withValidations === true) {
    if (pathName !== "/task") {
      throw new Error("Path invalid, you must be in /task route");
    }
    if (!Number.isInteger(projectId)) throw new Error("Invalid project");
    if (!Number.isInteger(stageId)) throw new Error("Invalid stage");
    if (!Number.isInteger(taskId)) throw new Error("Invalid task");
    if (!Number.isInteger(taskIndex)) throw new Error("Invalid task index");
  }

  return {
    projectId,
    stageId,
    taskId,
    taskIndex,
  };
}

type UseGetTaskDataFromUrlReturn = Record<
  "projectId" | "stageId" | "taskId" | "taskIndex",
  number
>;
