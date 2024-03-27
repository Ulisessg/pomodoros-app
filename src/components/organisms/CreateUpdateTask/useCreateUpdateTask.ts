import { DefaultSelectValue } from "@/constants";
import { TaskCtx } from "@/context/TaskCtx";
import TaskFrontend from "@/models/task/TaskFrontend";
import { useInputs } from "d-system";
import { MouseEvent, useContext } from "react";

export default function useCreateUpdateTask() {
	const { addTask } = useContext(TaskCtx);
	const UseInputs = useInputs(
		{
			task: "",
			description: "",
			stage: DefaultSelectValue,
		},
		true
	);

	const handleCreateTask = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!UseInputs.checkFormValidity()) return;
		try {
			const TaskFront = new TaskFrontend();
			TaskFront.name = UseInputs.inputsData.task;
			TaskFront.description = UseInputs.inputsData.description;
			TaskFront.stage_id = Number(UseInputs.inputsData.stage);
			const taskCreated = await TaskFront.addTask();
			addTask(Number(UseInputs.inputsData.stage), taskCreated);
			UseInputs.restartInputs("all");
		} catch {}
	};

	return {
		...UseInputs,
		handleCreateTask,
	};
}
