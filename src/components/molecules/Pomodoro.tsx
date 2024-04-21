"use client";
import { PomodorosContainerCtx } from "@/context/PomodorosContainerCtx";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import PomodoroFrontend from "@/models/pomodoro/PomodoroFrontend";
import convertSecondsInTime from "@/utils/convertSecondsInTime";
import convertTimeInSeconds from "@/utils/convertTimeInSeconds";
import { Button, theme, useInputs } from "d-system";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Pomodoro: FC<PomodoroProps> = ({
	duration,
	title,
	index,
	type,
	projectId,
	id,
	stopped_at,
}) => {
	const timerDuration = stopped_at === "00:00:00" ? duration : stopped_at;
	const { pushPomodoroEndNotification, pushRestEndNotification } = useContext(
		PomodorosContainerCtx
	);
	const [pomodoroElapsedSeconds, setPomodoroElapsedSeconds] =
		// Pomodoro always start in 0 elapsed seconds
		useState<number>(0);

	const [startPomodoro, setStartPomodoro] = useState<boolean>(false);
	const { inputsData, updateInput, restartInputs } = useInputs(
		{
			pomodoro: timerDuration,
		},
		false
	);

	const requestNotificationPermission = async () => {
		const permission = await Notification.requestPermission();
		if (permission === "denied") {
			alert(
				"Activa las notificaciones para ser avisado cuando un pomodoro termina!"
			);
		}
	};

	const updatePomodoroStoppedAt = useCallback(
		async (timeElapsedInSeconds: number) => {
			if (!Number.isInteger(timeElapsedInSeconds)) {
				throw new TypeError("Time elapsed must be integer");
			}
			const stoppedAt = convertSecondsInTime(
				convertTimeInSeconds(duration) - timeElapsedInSeconds
			);
			const pom = new PomodoroFrontend();
			pom.id = id;
			pom.project_id = projectId;
			if (type === "pomodoro") {
				pom.pomodoro_stopped_at = stoppedAt;
			} else {
				pom.rest_stopped_at = stoppedAt;
			}
			await pom.updateStoppedAt(type);
		},
		[duration, id, projectId, type]
	);

	const handleStartPomodoro = async () => {
		if (!startPomodoro) {
			await requestNotificationPermission();
		}
		// Pomodoro will be stopped
		if (startPomodoro) {
			updatePomodoroStoppedAt(pomodoroElapsedSeconds);
		}
		setStartPomodoro((prev) => !prev);
	};

	const showNotification = useCallback(() => {
		if (type === "pomodoro") {
			pushPomodoroEndNotification(title);
		} else {
			pushRestEndNotification();
		}
	}, [pushPomodoroEndNotification, pushRestEndNotification, title, type]);

	useEffect(() => {
		let interval: any;
		if (startPomodoro) {
			const timerDurationInSeconds = convertTimeInSeconds(timerDuration);

			interval = setInterval(() => {
				if (pomodoroElapsedSeconds < timerDurationInSeconds) {
					const updatedSeconds = pomodoroElapsedSeconds + 1;

					setPomodoroElapsedSeconds(updatedSeconds);

					updateInput(
						"pomodoro",
						convertSecondsInTime(timerDurationInSeconds - updatedSeconds)
					);
				} else {
					showNotification();
					clearInterval(interval);
					updateInput("pomodoro", duration);
					setStartPomodoro(false);
					setPomodoroElapsedSeconds(0);
					void updatePomodoroStoppedAt(convertTimeInSeconds(duration));
				}
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [
		duration,
		inputsData.pomodoro,
		pomodoroElapsedSeconds,
		restartInputs,
		showNotification,
		startPomodoro,
		timerDuration,
		updateInput,
		updatePomodoroStoppedAt,
	]);
	return (
		<Container>
			<Title>{title || `Pomodoro ${index + 1}`}</Title>
			<DurationContainer>
				<Duration>
					{pomodoroElapsedSeconds > 0 || startPomodoro
						? "Tiempo restante"
						: "Duracion"}
				</Duration>
				<DurationTime pomodoroStart={startPomodoro}>
					{inputsData.pomodoro}
				</DurationTime>
			</DurationContainer>
			<Button
				colorMessage="continue"
				size="small"
				text={startPomodoro ? "⏸" : "▶"}
				onClick={handleStartPomodoro}
			/>
		</Container>
	);
};

const Container = styled.div`
	//DEBUG
	padding: ${theme.spacing * 3}px;
	width: 100%;
	display: grid;
	align-content: center;
`;

const Title = styled.p`
	font-weight: 500;
	font-size: ${theme.spacing * 4}px;
`;

const DurationContainer = styled.div`
	display: flex;
	gap: ${theme.spacing}px;
`;

const Duration = styled.p`
	font-size: ${theme.spacing * 3}px;
`;

const DurationTime = styled.p<{ pomodoroStart: boolean }>`
	font-size: ${theme.spacing * 3}px;
	display: inline;
	color: ${({ pomodoroStart }) =>
		pomodoroStart ? theme.colors.error : theme.colors.dark1};
`;

interface PomodoroProps
	extends Omit<
		IPomodoro,
		"rest_duration" | "task_id" | "pomodoro_stopped_at" | "rest_stopped_at"
	> {
	index: number;
	type: "pomodoro" | "rest";
	projectId: number;
	// If pomodoro is rest type set rest_stopped_at otherwise pomodoro
	stopped_at: string;
}

export default Pomodoro;
