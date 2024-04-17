import { DefaultSelectValue } from "@/constants";
import { TaskCtx } from "@/context/TaskCtx";
import TaskFrontend from "@/models/task/TaskFrontend";
import { useInputs } from "d-system";
import { MouseEvent, useContext, useState } from "react";

export default function useCreateUpdateTask() {
	const [resetTaskDescription, setResetTaskDescription] =
		useState<boolean>(false);
	const { addTask } = useContext(TaskCtx);
	const UseInputs = useInputs(
		{
			task: "",
			stage: DefaultSelectValue,
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
			TaskFront.name = UseInputs.inputsData.task;
			TaskFront.description = description.textContent as string;
			TaskFront.stage_id = Number(UseInputs.inputsData.stage);
			const taskCreated = await TaskFront.addTask();
			addTask(Number(UseInputs.inputsData.stage), taskCreated);
			UseInputs.restartInputs("all");
			description.value = "";
			setResetTaskDescription(true);
		} catch {}
	};

	return {
		...UseInputs,
		handleCreateTask,
		resetTaskDescription,
	};
}
