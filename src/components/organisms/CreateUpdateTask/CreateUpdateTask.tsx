"use client";
import {
  Button,
  Form,
  Input,
  LoadingSpinner,
  AcceptanceCriteria,
  theme,
} from "d-system";
import React, { FC, use, useMemo } from "react";
import styled from "styled-components";
import useCreateUpdateTask from "./useCreateUpdateTask";
import TaskDescription from "@/components/molecules/TaskDescription";
import { ITask } from "@/models/task/Task";
import { TaskCtx } from "@/context/TaskCtx";

const CreateUpdateTask: FC<Props> = ({ stageId, task, taskIndex }) => {
  const { updateTaskStatus, createTaskStatus } = use(TaskCtx);
  const formTitle: string = useMemo(() => {
    if (typeof task === "undefined") {
      return "Nueva tarea";
    }
    return "Editar tarea";
  }, [task]);
  const buttonText = useMemo(() => {
    if (typeof task === "undefined") {
      return "Crear tarea";
    }
    return "Actualizar tarea";
  }, [task]);
  const {
    onChange,
    handleCreateTask,
    resetTaskDescription,
    formIsValid,
    inputsData,
  } = useCreateUpdateTask({
    stageId,
    task,
    taskIndex,
  });

  return (
    <CreateUpdateTaskContainer>
      <Form formTitle={formTitle} onSubmit={(e) => e.preventDefault()}>
        <Input
          required
          label="Tarea"
          name="task_name"
          value={inputsData.task_name}
          onChange={onChange}
          minLength={3}
          maxLength={120}
        />
        <TaskDescription
          editor
          controls={false}
          resetValue={resetTaskDescription}
          initialValue={task?.description}
        />

        <Button
          colorMessage="continue"
          size="large"
          text={buttonText}
          disabled={!formIsValid}
          onClick={handleCreateTask}
        />
        <SuccessMessageContainer>
          {(updateTaskStatus === "pending" ||
            createTaskStatus === "pending") && <LoadingSpinner size="small" />}
          <AcceptanceCriteria
            error={false}
            show={updateTaskStatus === "fulfilled"}
            text="Tarea actualizada"
          />
          <AcceptanceCriteria
            error={false}
            show={createTaskStatus === "fulfilled"}
            text="Tarea Creada"
          />
          <AcceptanceCriteria
            error={true}
            show={createTaskStatus === "error"}
            text="Error creando tarea, intenta de nuevo más tarde"
          />
          <AcceptanceCriteria
            error={true}
            show={updateTaskStatus === "error"}
            text="Error actualizando tarea, intenta de nuevo más tarde"
          />
        </SuccessMessageContainer>
      </Form>
    </CreateUpdateTaskContainer>
  );
};

const CreateUpdateTaskContainer = styled.div`
  display: grid;
`;

const SuccessMessageContainer = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  & > * {
    margin-top: ${theme.spacing * 3}px;

    font-size: ${theme.spacing * 3}px;
  }
`;

interface Props {
  stageId: number;
  task?: Omit<ITask, "start_date">;
  taskIndex?: number;
}

export default CreateUpdateTask;
