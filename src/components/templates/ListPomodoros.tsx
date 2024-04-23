"use client";
import { PomodorosCtx } from "@/context/PomodorosCtx";
import React, { FC, useContext, useEffect, useMemo } from "react";
import CreateUpdatePomodoro from "../organisms/CreateUpdatePomodoro";
import Pomodoro from "../molecules/Pomodoro";
import styled from "styled-components";
import { DefaultTime } from "@/constants";
import { theme } from "d-system";
import { PomodorosContainerProvider } from "@/context/PomodorosContainerCtx";
import useGetProjectId from "@/hooks/useGetProjectId";

const ListPomodoros: FC<PomodorosProps> = ({ taskId }) => {
	const projectId = useGetProjectId();
	const { getPomodoros, pomodoros: pomodorosGroupedByTask } =
		useContext(PomodorosCtx);

	const pomodoros = useMemo(() => {
		return pomodorosGroupedByTask[Number(taskId)] || [];
	}, [pomodorosGroupedByTask, taskId]);

	useEffect(() => {
		void getPomodoros(taskId);
	}, [getPomodoros, taskId]);

	return (
		<PomodorosContainerProvider>
			{pomodoros.length === 0 && <p>No pomodoros</p>}
			{pomodoros.length > 0 &&
				pomodoros.map((pom, index) => (
					<PomodorosContainer key={`${pom.id}${pom.task_id}`}>
						<Pomodoro
							id={pom.id}
							duration={pom.duration}
							title={pom.title}
							index={index}
							type="pomodoro"
							projectId={projectId}
							stopped_at={pom.pomodoro_stopped_at}
						/>
						{pom.rest_duration !== DefaultTime && (
							<Pomodoro
								id={pom.id}
								duration={pom.rest_duration}
								index={index}
								title="Descanso"
								type="rest"
								projectId={projectId}
								stopped_at={pom.rest_stopped_at}
							/>
						)}
					</PomodorosContainer>
				))}
			<CreateUpdatePomodoro taskId={taskId} />
		</PomodorosContainerProvider>
	);
};

const PomodorosContainer = styled.div`
	display: flex;
	width: 100%;
	border: 1px solid ${theme.colors.dark1};
	margin-bottom: ${theme.spacing * 3}px;
	border-radius: ${theme.spacing}px;
`;

interface PomodorosProps {
	taskId: number;
}

export default ListPomodoros;
