"use client";
import { PomodorosContainerCtx } from "@/context/PomodorosContainerCtx";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import convertSecondsInTime from "@/utils/convertSecondsInTime";
import convertTimeInSeconds from "@/utils/convertTimeInSeconds";
import { Button, theme, useInputs } from "d-system";
import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Pomodoro: FC<PomodoroProps> = ({ duration, title, index, type }) => {
	const { pushPomodoroEndNotification, pushRestEndNotification } = useContext(
		PomodorosContainerCtx
	);
	const [pomodoroElapsedSeconds, setPomodoroElapsedSeconds] =
		useState<number>(0);
	const [startPomodoro, setStartPomodoro] = useState<boolean>(false);
	const { inputsData, updateInput, restartInputs } = useInputs(
		{
			pomodoro: duration,
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

	const handleStartPomodoro = async () => {
		if (!startPomodoro) {
			await requestNotificationPermission();
		}
		setStartPomodoro((prev) => !prev);
	};

	const showNotification = () => {
		if (type === "pomodoro") {
			pushPomodoroEndNotification(title);
		} else {
			pushRestEndNotification();
		}
	};

	useEffect(() => {
		let interval: any;
		if (startPomodoro) {
			const timerDurationInSeconds = convertTimeInSeconds(duration);

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
					restartInputs("all");
					setStartPomodoro(false);
					setPomodoroElapsedSeconds(0);
				}
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [
		duration,
		pomodoroElapsedSeconds,
		restartInputs,
		startPomodoro,
		updateInput,
	]);
	return (
		<Container>
			<Title>{title || `Pomodoro ${index + 1}`}</Title>
			<DurationContainer>
				<Duration>
					{pomodoroElapsedSeconds > 0 || startPomodoro
						? "Tiempo restante"
						: "Duracion"}
					:{" "}
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
	extends Omit<IPomodoro, "rest_duration" | "id" | "task_id"> {
	index: number;
	type: "pomodoro" | "rest";
}

export default Pomodoro;
