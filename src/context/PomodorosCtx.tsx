"use client";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import PomodoroFrontend from "@/models/pomodoro/PomodoroFrontend";
import getFirstObjectKey from "@/utils/getFirstObjectKey";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: State = {
	pomodoros: {},
	getPomodoros: async () => {},
	addPomodoro: () => {},
	updatePomodoro: () => {},
};

export const PomodorosCtx = createContext(initialState);

export const PomodorosCtxProvider: FC<PomodorosCtxProviderProps> = ({
	children,
}) => {
	const [pomodoros, setPomodoros] = useState<State["pomodoros"]>(
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

	const addPomodoro: State["addPomodoro"] = (taskId, newPomodoro) => {
		setPomodoros((prev) => {
			const firstKey = getFirstObjectKey(prev);
			if (typeof firstKey === "undefined") {
				return {
					[Number(taskId)]: [newPomodoro],
				};
			} else {
				const listOfPomodoros = [...prev[Number(taskId)]];
				listOfPomodoros.push(newPomodoro);
				return {
					...prev,
					[Number(taskId)]: [...listOfPomodoros],
				};
			}
		});
	};
	const updatePomodoro: State["updatePomodoro"] = (
		taskId,
		index,
		updatedPomodoro
	) => {
		if (!Number.isInteger(taskId)) {
			throw new TypeError("Invalid id");
		}
		if (!Number.isInteger(index)) {
			throw new TypeError("Invalid index");
		}
		const uPom = new PomodoroFrontend();
		// Validate pomodoro
		uPom.duration = updatedPomodoro.duration;
		uPom.id = updatedPomodoro.id;
		uPom.pomodoro_stopped_at = updatedPomodoro.pomodoro_stopped_at;
		uPom.rest_duration = updatedPomodoro.rest_duration;
		uPom.rest_stopped_at = updatedPomodoro.rest_stopped_at;
		uPom.task_id = updatedPomodoro.task_id;
		uPom.title = updatedPomodoro.title;
		setPomodoros((prev) => {
			const listOfPomodoros = prev[Number(taskId)];
			listOfPomodoros.splice(index, 1, updatedPomodoro);
			const updatedData: State["pomodoros"] = {
				...prev,
				[Number(taskId)]: listOfPomodoros,
			};
			return updatedData;
		});
	};
	return (
		<PomodorosCtx.Provider
			value={{
				pomodoros,
				getPomodoros,
				addPomodoro,
				updatePomodoro,
			}}
		>
			{children}
		</PomodorosCtx.Provider>
	);
};
interface State {
	pomodoros: Record<
		// Task id
		number,
		IPomodoro[]
	>;
	// eslint-disable-next-line no-unused-vars
	getPomodoros: (taskId: number) => Promise<void>;
	// eslint-disable-next-line no-unused-vars
	addPomodoro: (taskId: number, newPomodoro: IPomodoro) => void;
	/**
	 *
	 * @param taskId
	 * @param index - Index in array of pomodoros
	 * @param updatedPomodoro
	 * @returns
	 */
	updatePomodoro: (
		// eslint-disable-next-line no-unused-vars
		taskId: number,
		// eslint-disable-next-line no-unused-vars
		index: number,
		// eslint-disable-next-line no-unused-vars
		updatedPomodoro: IPomodoro
	) => void;
}
interface PomodorosCtxProviderProps {
	children: ReactNode;
}
