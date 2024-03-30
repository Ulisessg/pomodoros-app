import { ITask } from "@/models/task/Task";
import React, { FC } from "react";
import styled from "styled-components";
import TaskDescription from "../molecules/TaskDescription";
import { theme } from "d-system";

const TaskDetails: FC<TaskDetailsProps> = ({ task }) => {
	return (
		<Container>
			<TaskName>
				<b>Tarea:</b> {task.name}
			</TaskName>
			<TaskDescription
				initialValue={task.description}
				controls={false}
				editor={false}
			/>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	width: 100%;
	padding: ${theme.spacing * 3}px;
	gap: ${theme.spacing * 3}px;
`;

const TaskName = styled.h2``;

interface TaskDetailsProps {
	task: ITask;
}
export default TaskDetails;
