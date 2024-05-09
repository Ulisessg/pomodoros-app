import { ITask } from "@/models/task/Task";
import { theme } from "d-system";
import Link from "next/link";
import React, { DragEvent, FC } from "react";
import styled from "styled-components";

const Task: FC<TaskProps> = ({ task, taskIndex, projectId, isExampleTask }) => {
	const handleOnDragStart = (e: DragEvent<HTMLAnchorElement>) => {
		const format = "text/plain";
		e.dataTransfer.clearData();
		const dragEventData: DragEventData = {
			stageId: Number(e.currentTarget.getAttribute("data-task-stage-id")),
			taskIndex: Number(e.currentTarget.getAttribute("data-task-index")),
		};
		const DragEventDataString = JSON.stringify(dragEventData);
		e.dataTransfer.setData(format, DragEventDataString);
	};

	return (
		<>
			<TaskContainer
				href={
					isExampleTask
						? "#"
						: `/task?project=${projectId}&stage=${task.stage_id}&task=${task.id}`
				}
				draggable={!isExampleTask}
				onDragStart={handleOnDragStart}
				data-task-stage-id={task.stage_id}
				data-task-index={taskIndex}
			>
				<TaskName>{task.name}</TaskName>
			</TaskContainer>
		</>
	);
};

const TaskContainer = styled(Link)`
	padding: ${theme.spacing * 3}px;
	border-bottom: 1px solid ${theme.colors.dark1};
	text-decoration: none;
	color: ${theme.colors.dark2};
	&:visited {
		color: ${theme.colors.dark2};
	}
`;

const TaskName = styled.p`
	overflow-wrap: anywhere;
`;

interface TaskProps {
	task: ITask;
	taskIndex: number;
	projectId: number;
	isExampleTask: boolean;
}

export default Task;

export interface DragEventData {
	stageId: number;
	taskIndex: number;
}
