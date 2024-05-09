import { TaskCtx } from "@/context/TaskCtx";
import { ITask } from "@/models/task/Task";
import TaskFrontend from "@/models/task/TaskFrontend";
import { useInputs } from "d-system";
import { MouseEvent, useContext, useState } from "react";

export default function useCreateUpdateTask({
	stageId,
	task,
	taskIndex,
}: Args) {
	const [resetTaskDescription, setResetTaskDescription] =
		useState<boolean>(false);
	const { addTask, updateTask } = useContext(TaskCtx);
	const UseInputs = useInputs(
		{
			task_name: task?.name ?? "",
		},
		true
	);

	const handleCreateTask = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!UseInputs.checkFormValidity()) return;
		const description = document.querySelector(
			'textarea[name="description"]'
		) as HTMLTextAreaElement;

		// Update task
		if (task) {
			const TaskFront = new TaskFrontend(task as ITask);
			if (!Number.isInteger(taskIndex))
				throw new TypeError("Task index must be int number");
			const updatedTask = await TaskFront.updateTask();
			updateTask(stageId, updatedTask, Number(taskIndex));
		} else {
			const TaskFront = new TaskFrontend();
			TaskFront.name = UseInputs.inputsData.task_name;
			TaskFront.description = description.textContent as string;
			// Create task
			TaskFront.stage_id = Number(stageId);

			const taskCreated = await TaskFront.addTask();
			addTask(Number(stageId), taskCreated);
			UseInputs.restartInputs("all");
			description.value = "";
			setResetTaskDescription(true);
			// Set focus on input task name, ---- Make it only on create task ----
			const inputName = document.querySelector(
				'input[name="task_name"]'
			) as HTMLInputElement;
			inputName.focus();
		}
	};

	return {
		...UseInputs,
		resetTaskDescription,
		handleCreateTask,
	};
}

interface Args {
	stageId: number;
	task?: Omit<ITask, "start_date">;
	taskIndex?: number;
}
