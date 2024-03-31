import { PomodorosCtx } from "@/context/PomodorosCtx";
import React, { FC, Fragment, useContext, useEffect, useMemo } from "react";
import CreateUpdatePomodoro from "../organisms/CreateUpdatePomodoro";
import Pomodoro from "../molecules/Pomodoro";
import styled from "styled-components";
import { DefaultTime } from "@/constants";
import { theme } from "d-system";

const ListPomodoros: FC<PomodorosProps> = ({ taskId }) => {
	const { getPomodoros, pomodoros: pomodorosGroupedByTask } =
		useContext(PomodorosCtx);

	const pomodoros = useMemo(() => {
		return pomodorosGroupedByTask[Number(taskId)] || [];
	}, [pomodorosGroupedByTask, taskId]);

	useEffect(() => {
		void getPomodoros(taskId);
	}, [getPomodoros, taskId]);
	return (
		<>
			{pomodoros.length === 0 && <p>No pomodoros</p>}
			{pomodoros.length > 0 &&
				pomodoros.map((pom, index) => (
					<PomodorosContainer key={`${pom.id}${pom.task_id}`}>
						<Pomodoro duration={pom.duration} title={pom.title} index={index} />
						{pom.rest_duration !== DefaultTime && (
							<Pomodoro
								duration={pom.rest_duration}
								index={index}
								title="Descanso"
							/>
						)}
					</PomodorosContainer>
				))}
			<CreateUpdatePomodoro taskId={taskId} />
		</>
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
