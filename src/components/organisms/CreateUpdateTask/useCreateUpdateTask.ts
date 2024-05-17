import { TaskCtx } from "@/context/TaskCtx";
import { ITask } from "@/models/task/Task";
import { useInputs } from "d-system";
import { MouseEvent, useContext, useEffect, useState } from "react";

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
      if (!Number.isInteger(taskIndex))
        throw new TypeError("Task index must be int number");
      const taskData = {
        ...task,
        name: UseInputs.inputsData.task_name,
        description: description.textContent ?? "",
      };

      updateTask(stageId, taskData, Number(taskIndex));
    } else {
      addTask({
        stage_id: stageId,
        name: UseInputs.inputsData.task_name,
        description: description.textContent ?? "",
      });

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

  useEffect(() => {
    if (task) {
      UseInputs.updateInput("task_name", task.name);
      UseInputs.checkFormValidity();
    }
  }, [task]);
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
