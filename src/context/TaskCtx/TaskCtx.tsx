import { DragEventData } from "@/components/organisms/Task";
import { ITask } from "@/models/task/Task";
import TaskFrontend from "@/models/task/TaskFrontend";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: State = {
	tasks: {},
	addTask: () => {},
	getTasks: async () => {},
	moveTaskToStage: async () => {},
	updateTask: () => {},
	getTasksIsLoading: true,
};

export const TaskCtx = createContext(initialState);

export const TaskCtxProvider: FC<TaskCtxProps> = ({ children }) => {
	const [tasks, setTasks] = useState<TTask>(initialState.tasks);
	const [getTasksIsLoading, setGetTasksIsLoading] = useState<boolean>(true);

	const addTask: State["addTask"] = (stackId, nTask) => {
		setTasks((prev) => {
			const stackIdParsed: number = Number(stackId);
			let prevTasks = prev[stackIdParsed];
			if (!prevTasks) {
				prevTasks = [];
			}
			return {
				...prev,
				[stackIdParsed]: [...prevTasks, nTask],
			};
		});
	};

	const getTasks: State["getTasks"] = async (projectId) => {
		const TaskFront = new TaskFrontend();
		setGetTasksIsLoading(true);
		const tasksGroupedByStageId = await TaskFront.getTasks(projectId);
		setGetTasksIsLoading(false);
		setTasks(tasksGroupedByStageId);
	};

	const moveTaskToStage: State["moveTaskToStage"] = async (taskData) => {
		const { newStageId, stageId, taskIndex } = taskData;

		// Avoid duplicate tasks
		if (newStageId === stageId) return;
		const originStageTasks = tasks[Number(stageId)];

		const taskToMove = originStageTasks.at(taskIndex) as ITask;

		try {
			const TaskFront = new TaskFrontend();
			TaskFront.day_id = taskToMove.day_id;
			TaskFront.description = taskToMove.description;
			TaskFront.id = taskToMove.id;
			TaskFront.name = taskToMove.name;
			// Update the stage id
			TaskFront.stage_id = newStageId;

			setTasks((prev) => {
				const tasksWithoutDeletedTask = [...originStageTasks];
				tasksWithoutDeletedTask.splice(taskIndex, 1);

				const targetStageTasks = prev[Number(newStageId)];
				const targetStageTasksUpdated = [...targetStageTasks];
				// Inset the task at the beginning of the stage
				targetStageTasksUpdated.unshift({
					...taskToMove,
					stage_id: newStageId,
				});

				return {
					...prev,
					[Number(stageId)]: tasksWithoutDeletedTask,
					[Number(newStageId)]: targetStageTasksUpdated,
				};
			});
			await TaskFront.updateStage();
		} catch {
			return;
		}
	};

	const updateTask: State["updateTask"] = (stageId, task, taskIndex) => {
		const parsedStageId = Number(stageId);
		if (!Number.isInteger(stageId))
			throw new TypeError("Stage id must be integer");
		setTasks((prev) => {
			const updatedTasks = [...prev[parsedStageId]];
			updatedTasks.splice(taskIndex, 1, task);
			return {
				...prev,
				[parsedStageId]: updatedTasks,
			};
		});
	};

	return (
		<TaskCtx.Provider
			value={{
				getTasksIsLoading,
				tasks,
				addTask,
				getTasks,
				moveTaskToStage,
				updateTask,
			}}
		>
			{children}
		</TaskCtx.Provider>
	);
};

interface State {
	getTasksIsLoading: boolean;
	tasks: TTask;
	// eslint-disable-next-line no-unused-vars
	addTask: (stackId: number, task: ITask) => void;
	// eslint-disable-next-line no-unused-vars
	getTasks: (projectId: number) => Promise<void>;
	// eslint-disable-next-line no-unused-vars
	moveTaskToStage: (data: UpdateTaskArg) => Promise<void>;

	// eslint-disable-next-line no-unused-vars
	updateTask: (stageId: number, task: ITask, taskIndex: number) => void;
}

interface TaskCtxProps {
	children: ReactNode;
}

export type TTask = Record<
	// Stage id
	string,
	ITask[]
>;

interface UpdateTaskArg extends DragEventData {
	newStageId: number;
}
