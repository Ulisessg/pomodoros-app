"use client";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import TaskDetails from "@/components/templates/TaskDetails";
import ListPomodoros from "@/components/templates/ListPomodoros";
import { FC, Suspense } from "react";
import { LoadingSpinner } from "d-system";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const TaskDetailPage = () => {
	const { stage, task, project } = useGetTaskDataFromUrl();

	return (
		<SessionAuth>
			<TaskDetails project={project} stage={stage} taskId={task} />
			<ListPomodoros taskId={task} />
		</SessionAuth>
	);
};

const Wrapper: FC = () => (
	<Suspense fallback={<LoadingSpinner size="small" />}>
		<TaskDetailPage />
	</Suspense>
);

export default Wrapper;
