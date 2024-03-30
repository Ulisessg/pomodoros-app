"use client";
import { TaskCtx } from "@/context/TaskCtx";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import getFirstObjectKey from "@/utils/getFirstObjectKey";
import { LoadingSpinner } from "d-system";
import React, { useContext, useEffect, useMemo } from "react";
import TaskDetails from "@/components/templates/TaskDetails";

const TaskDetailPage = () => {
	const { stage, task, project } = useGetTaskDataFromUrl();
	const { tasks: tasksGroupedByStage, getTasks } = useContext(TaskCtx);
	const taskData = useMemo(() => {
		return tasksGroupedByStage[stage]?.find((tsk) => tsk.id === task) || null;
	}, [stage, task, tasksGroupedByStage]);

	useEffect(() => {
		if (typeof getFirstObjectKey(tasksGroupedByStage) === "undefined") {
			getTasks(project);
		}
	}, [getTasks, project, tasksGroupedByStage]);
	return (
		<>
			{taskData === null && <LoadingSpinner size="small" />}
			{taskData !== null && <TaskDetails task={taskData} />}
		</>
	);
};

export default TaskDetailPage;
