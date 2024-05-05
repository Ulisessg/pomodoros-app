import { TaskCtx } from "@/context/TaskCtx";
import TaskFrontend from "@/models/task/TaskFrontend";
import { useInputs } from "d-system";
import { MouseEvent, useContext, useState } from "react";

export default function useCreateUpdateTask({ stageId }: Args) {
	const [resetTaskDescription, setResetTaskDescription] =
		useState<boolean>(false);
	const { addTask } = useContext(TaskCtx);
	const UseInputs = useInputs(
		{
			task_name: "",
		},
		true
	);

	const handleCreateTask = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!UseInputs.checkFormValidity()) return;
		try {
			const description = document.querySelector(
				'textarea[name="description"]'
			) as HTMLTextAreaElement;
			const TaskFront = new TaskFrontend();
			TaskFront.name = UseInputs.inputsData.task_name;
			TaskFront.description = description.textContent as string;
			TaskFront.stage_id = Number(stageId);
			const taskCreated = await TaskFront.addTask();
			addTask(Number(stageId), taskCreated);
			UseInputs.restartInputs("all");
			description.value = "";
			setResetTaskDescription(true);
			// Set focus on input task name, ---- Make it only on create task ----
			const inputName = document.querySelector(
				'input[name="task"]'
			) as HTMLInputElement;
			inputName.focus();
		} catch {}
	};

	return {
		...UseInputs,
		resetTaskDescription,
		handleCreateTask,
	};
}

interface Args {
	stageId: number;
}
