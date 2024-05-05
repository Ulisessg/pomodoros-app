"use client";
import { Button, Form, Input } from "d-system";
import React, { FC } from "react";
import styled from "styled-components";
import useCreateUpdateTask from "./useCreateUpdateTask";
import TaskDescription from "@/components/molecules/TaskDescription";

const CreateUpdateTask: FC<Props> = ({ stageId }) => {
	const {
		onChange,
		handleCreateTask,
		resetTaskDescription,
		formIsValid,
		inputsData,
	} = useCreateUpdateTask({
		stageId,
	});

	return (
		<CreateUpdateTaskContainer>
			<Form formTitle="Nueva tarea" onSubmit={(e) => e.preventDefault()}>
				<Input
					required
					label="Tarea"
					name="task_name"
					value={inputsData.task_name}
					onChange={onChange}
					minLength={3}
				/>
				<TaskDescription
					editor
					controls={false}
					resetValue={resetTaskDescription}
				/>

				<Button
					colorMessage="continue"
					size="large"
					text="Crear tarea"
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
}

export default CreateUpdateTask;
