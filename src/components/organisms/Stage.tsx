import { TaskCtx } from "@/context/TaskCtx";
import { theme } from "d-system";
import { DragEvent, FC, Fragment, useContext, useMemo } from "react";
import styled from "styled-components";
import Task, { DragEventData } from "./Task";

const Stage: FC<StageProps> = ({ title, stageId, projectId }) => {
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
								<Task task={task} taskIndex={index} projectId={projectId} />
							</Fragment>
						);
					})}
				{!stageHaveTasks && (
					<StageEmptyMessageContainer>
						<StageEmptyMessage>No Tasks yet</StageEmptyMessage>
					</StageEmptyMessageContainer>
				)}
			</TasksContainer>
		</StageContainer>
	);
};

const StageHeight = theme.spacing * 45;
const StageTitleHeight = theme.spacing * 2;
const StageTitlePadding = StageTitleHeight;

const StageContainer = styled.div`
	overflow: scroll;
	border: 1px solid ${theme.colors.dark1};
	border-radius: ${theme.spacing}px;
	width: ${theme.spacing * 35}px;
	height: ${StageHeight}px;
`;

const StageTitle = styled.p`
	text-align: center;
	padding: ${StageTitlePadding}px;
	height: ${StageTitleHeight}px;
`;

const TasksContainer = styled.div`
	display: grid;
	width: 100%;
	margin-bottom: ${theme.spacing}px;
`;

const StageEmptyMessageContainer = styled.div`
	grid: flex;
	/**
	* Padding includes top and bottom
	* Second StageTitleHeight is StageEmptyMessage height
	*/
	height: ${StageHeight -
	StageTitleHeight -
	StageTitleHeight -
	StageTitlePadding * 2}px;
	margin: 0px;
	align-content: center;
`;
const StageEmptyMessage = styled.p`
	text-align: center;

	height: ${StageTitleHeight}px;
`;

interface StageProps {
	title: string;
	color: string;
	stageId: number;
	projectId: number;
}
export default Stage;
