import React, { FC, useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import TaskDescription from "../molecules/TaskDescription";
import { LoadingSpinner, theme } from "d-system";
import { TaskCtx } from "@/context/TaskCtx";
import getFirstObjectKey from "@/utils/getFirstObjectKey";

const TaskDetails: FC<TaskDetailsProps> = ({ project, stage, taskId }) => {
	const { tasks: tasksGroupedByStage, getTasks } = useContext(TaskCtx);
	const taskData = useMemo(() => {
		return tasksGroupedByStage[stage]?.find((tsk) => tsk.id === taskId) || null;
	}, [stage, taskId, tasksGroupedByStage]);

	useEffect(() => {
		if (typeof getFirstObjectKey(tasksGroupedByStage) === "undefined") {
			getTasks(project);
		}
	}, [getTasks, project, tasksGroupedByStage]);
	return (
		<Container>
			{taskData === null && <LoadingSpinner size="small" />}
			{taskData !== null && (
				<>
					<TaskName>Tarea: {taskData.name}</TaskName>
					<Description>Descripción:</Description>
					<TaskDescription
						initialValue={taskData.description}
						controls={false}
						editor={false}
					/>
				</>
			)}
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	width: 100%;
	padding: ${theme.spacing * 3}px;
	gap: ${theme.spacing * 3}px;
`;

const TaskName = styled.h2`
	font-size: ${theme.spacing * 4}px;
`;

const Description = styled.p`
	font-size: ${theme.spacing * 3}px;
`;

interface TaskDetailsProps {
	stage: number;
	project: number;
	taskId: number;
}
export default TaskDetails;
