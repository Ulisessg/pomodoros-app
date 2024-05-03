import { TaskCtx } from "@/context/TaskCtx";
import { theme } from "d-system";
import { DragEvent, FC, Fragment, useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import Task, { DragEventData } from "@/components/organisms/Task";
import { ITask } from "@/models/task/Task";
import { MinScreenWidth } from "@/constants";

const Stage: FC<StageProps> = ({ title, stageId, projectId }) => {
	const { tasks: tasksGroupedByStage, moveTaskToStage } = useContext(TaskCtx);
	const tasks: ITask[] = useMemo(() => {
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
								<Task
									task={task}
									taskIndex={index}
									projectId={projectId}
									isExampleTask={false}
								/>
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

export const StageContainerStyles = css`
	overflow: scroll;
	border: 1px solid ${theme.colors.dark1};
	border-radius: ${theme.spacing}px;
	width: ${theme.spacing * 35}px;
	height: ${StageHeight}px;
`;

export const StageContainer = styled.div`
	${StageContainerStyles}
`;

export const StageTitleStyles = css`
	text-align: center;
	padding: ${StageTitlePadding}px;
	height: ${StageTitleHeight}px;
`;

export const StageTitle = styled.p`
	${StageTitleStyles}
`;

export const TasksContainer = styled.div`
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

// CONTAINERS

const StagesGap = theme.spacing * 2;

export const StagesContainer = styled.div`
	display: grid;
	gap: ${StagesGap}px;
	grid-template-columns: 1fr;
	@media screen and (min-width: ${MinScreenWidth.tablet}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media screen and (min-width: ${MinScreenWidth.desktop}px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const ListOfStagesContainer = styled.div`
	display: grid;
	margin-bottom: ${theme.spacing * 6}px;
	width: 100%;
	justify-content: center;
`;

export interface StageProps {
	title: string;
	color: string;
	stageId: number;
	projectId: number;
}
export default Stage;
