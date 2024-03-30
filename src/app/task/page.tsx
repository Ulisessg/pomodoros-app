"use client";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import TaskDetails from "@/components/templates/TaskDetails";
import ListPomodoros from "@/components/templates/ListPomodoros";

const TaskDetailPage = () => {
	const { stage, task, project } = useGetTaskDataFromUrl();

	return (
		<>
			<TaskDetails project={project} stage={stage} taskId={task} />
			<ListPomodoros taskId={task} />
		</>
	);
};

export default TaskDetailPage;
