import { ITask } from "@/models/task/Task";
import { theme } from "d-system";
import Link from "next/link";
import React, { DragEvent, FC } from "react";
import styled from "styled-components";

const Task: FC<TaskProps> = ({ task, taskIndex }) => {
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
				href={"#"}
				draggable
				onDragStart={handleOnDragStart}
				data-task-stage-id={task.stage_id}
				data-task-index={taskIndex}
			>
				<p>{task.name}</p>
			</TaskContainer>
		</>
	);
};

const TaskContainer = styled(Link)`
	padding: ${theme.spacing * 3}px;
	border-bottom: 1px solid ${theme.colors.dark1};
	text-decoration: none;
`;

interface TaskProps {
	task: ITask;
	taskIndex: number;
	taskStageId: number;
}

export default Task;

export interface DragEventData {
	stageId: number;
	taskIndex: number;
}
