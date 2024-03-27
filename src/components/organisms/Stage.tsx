import { TaskCtx } from "@/context/TaskCtx";
import { theme } from "d-system";
import { DragEvent, FC, Fragment, useContext, useMemo } from "react";
import styled from "styled-components";
import Task, { DragEventData } from "../molecules/Task";

const Stage: FC<StageProps> = ({ title, stageId }) => {
	const { tasks: tasksGroupedByStage, moveTaskToStage } = useContext(TaskCtx);
	const tasks = useMemo(() => {
		return tasksGroupedByStage[stageId];
	}, [stageId, tasksGroupedByStage]);
	const stageHaveTasks: boolean = useMemo(() => {
		if (!Array.isArray(tasks)) return false;

		if (tasks.length > 0) return true;
		return false;
	}, [tasks]);

	const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const taskOrigin: DragEventData = JSON.parse(
			e.dataTransfer.getData("text/plain")
		);

		await moveTaskToStage({
			newStageId: stageId,
			stageId: taskOrigin.stageId,
			taskIndex: taskOrigin.taskIndex,
		});
	};
	const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};
	return (
		<StageContainer onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
			<StageTitle>{title}</StageTitle>
			<TasksContainer>
				{stageHaveTasks &&
					tasks.map((task, index) => {
						return (
							<Fragment key={`${stageId}${task.id}`}>
								<Task task={task} taskIndex={index} taskStageId={stageId} />
							</Fragment>
						);
					})}
				{!stageHaveTasks && <p>No Tasks</p>}
			</TasksContainer>
		</StageContainer>
	);
};

const StageContainer = styled.div`
	border: 1px solid ${theme.colors.dark1};
	border-radius: ${theme.spacing}px;
	width: ${theme.spacing * 40}px;
	height: ${theme.spacing * 50}px;
`;

const StageTitle = styled.p`
	text-align: center;
	padding: ${theme.spacing * 2}px;
`;

const TasksContainer = styled.div`
	display: grid;
	width: 100%;
	margin-bottom: ${theme.spacing}px;
`;

interface StageProps {
	title: string;
	color: string;
	stageId: number;
}
export default Stage;
