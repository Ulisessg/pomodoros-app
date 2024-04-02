"use client";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import TaskDetails from "@/components/templates/TaskDetails";
import ListPomodoros from "@/components/templates/ListPomodoros";
import { FC, Suspense } from "react";
import { LoadingSpinner } from "d-system";

const TaskDetailPage = () => {
	const { stage, task, project } = useGetTaskDataFromUrl();

	return (
		<>
			<TaskDetails project={project} stage={stage} taskId={task} />
			<ListPomodoros taskId={task} />
		</>
	);
};

const Wrapper: FC = () => (
	<Suspense fallback={<LoadingSpinner size="small" />}>
		<TaskDetailPage />
	</Suspense>
);

export default Wrapper;
