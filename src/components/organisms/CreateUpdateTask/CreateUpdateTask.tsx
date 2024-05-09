"use client";
import { Button, Form, Input } from "d-system";
import React, { FC, useMemo } from "react";
import styled from "styled-components";
import useCreateUpdateTask from "./useCreateUpdateTask";
import TaskDescription from "@/components/molecules/TaskDescription";
import { ITask } from "@/models/task/Task";

const CreateUpdateTask: FC<Props> = ({ stageId, task, taskIndex }) => {
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
			</Form>
		</CreateUpdateTaskContainer>
	);
};

const CreateUpdateTaskContainer = styled.div`
	display: grid;
`;

interface Props {
	stageId: number;
	task?: Omit<ITask, "start_date">;
	taskIndex?: number;
}

export default CreateUpdateTask;
