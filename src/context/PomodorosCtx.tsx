"use client";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import PomodoroFrontend from "@/models/pomodoro/PomodoroFrontend";
import getFirstObjectKey from "@/utils/getFirstObjectKey";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: PomodorosCtxState = {
	pomodoros: {},
	// eslint-disable-next-line no-unused-vars
	getPomodoros: async () => {},
	addPomodoro: () => {},
};

export const PomodorosCtx = createContext(initialState);

export const PomodorosCtxProvider: FC<PomodorosCtxProviderProps> = ({
	children,
}) => {
	const [pomodoros, setPomodoros] = useState<PomodorosCtxState["pomodoros"]>(
		initialState.pomodoros
	);
	const getPomodoros = async (taskId: number) => {
		if (typeof getFirstObjectKey(pomodoros) === "undefined") {
			const pomodorosFront = new PomodoroFrontend();
			pomodorosFront.task_id = taskId;
			const pomodoros = await pomodorosFront.getPomodoros();
			setPomodoros({
				[Number(taskId)]: pomodoros,
			});
		}
	};

	const addPomodoro: PomodorosCtxState["addPomodoro"] = (
		taskId,
		newPomodoro
	) => {
		setPomodoros((prev) => ({
			...prev,
			[Number(taskId)]: [...prev[taskId], newPomodoro],
		}));
	};
	return (
		<PomodorosCtx.Provider
			value={{
				pomodoros,
				getPomodoros,
				addPomodoro,
			}}
		>
			{children}
		</PomodorosCtx.Provider>
	);
};
interface PomodorosCtxState {
	pomodoros: Record<
		// Task id
		string,
		IPomodoro[]
	>;
	// eslint-disable-next-line no-unused-vars
	getPomodoros: (taskId: number) => Promise<void>;
	// eslint-disable-next-line no-unused-vars
	addPomodoro: (taskId: number, newPomodoro: IPomodoro) => void;
}
interface PomodorosCtxProviderProps {
	children: ReactNode;
}
