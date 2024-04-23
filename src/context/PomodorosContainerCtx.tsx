"use client";
import { FC, ReactNode, createContext, useRef } from "react";

const initialState: State = {
	pushPomodoroEndNotification: () => {},
	pushRestEndNotification: () => {},
};

export const PomodorosContainerCtx = createContext(initialState);

export const PomodorosContainerProvider: FC<Props> = ({ children }) => {
	const { current: PomodoroEndAudio } = useRef<HTMLAudioElement>(
		new Audio(process.env.NEXT_PUBLIC_POMODORO_END_AUDIO as string)
	);
	const { current: RestEndAudio } = useRef<HTMLAudioElement>(
		new Audio(process.env.NEXT_PUBLIC_REST_END_AUDIO)
	);

	const handleNotification = (
		audio: HTMLAudioElement,
		notificationMessage: string
	) => {
		audio.volume = 1;
		audio.play();
		const notification = new Notification(notificationMessage, {
			requireInteraction: true,
			body: "Haz click en la notificación para detener el audio",
		});
		notification.onclose = () => {
			audio.pause();
			audio.currentTime = 0;
		};
	};
	const pushPomodoroEndNotification: State["pushPomodoroEndNotification"] = (
		pomodoroTitle
	) => {
		handleNotification(
			PomodoroEndAudio,
			`Terminó el pomodoro ${pomodoroTitle}, es hora de descansar! 🛌`
		);
	};

	const pushRestEndNotification: State["pushRestEndNotification"] = () => {
		handleNotification(
			RestEndAudio,
			"Terminó el descanso, de vuelta al trabajo! ⚒️"
		);
	};
	return (
		<PomodorosContainerCtx.Provider
			value={{
				pushPomodoroEndNotification,
				pushRestEndNotification,
			}}
		>
			{children}
		</PomodorosContainerCtx.Provider>
	);
};

interface Props {
	children: ReactNode;
}

interface State {
	// eslint-disable-next-line no-unused-vars
	pushPomodoroEndNotification: (pomodoroTitle: string) => void;
	pushRestEndNotification: () => void;
}
