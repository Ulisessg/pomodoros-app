"use client";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import TaskDetails from "@/components/templates/TaskDetails";

const TaskDetailPage = () => {
	const { stage, task, project } = useGetTaskDataFromUrl();

	return (
		<>
			<TaskDetails project={project} stage={stage} taskId={task} />
		</>
	);
};

export default TaskDetailPage;
