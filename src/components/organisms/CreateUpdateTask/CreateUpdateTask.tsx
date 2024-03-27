"use client";
import { DefaultSelectValue } from "@/constants";
import { StagesCtx } from "@/context/StagesCtx";
import { TaskCtx } from "@/context/TaskCtx";
import useGetProjectId from "@/hooks/useGetProjectId";
import { IStage } from "@/models/stage/Stage";
import TaskFrontend from "@/models/task/TaskFrontend";
import { Button, Details, Form, Input, Select, useInputs } from "d-system";
import React, { MouseEvent, useContext, useMemo } from "react";
import styled from "styled-components";

const CreateUpdateTask = () => {
	const projectId = useGetProjectId();
	const { addTask } = useContext(TaskCtx);
	const {
		inputsData,
		onChange,
		formIsValid,
		inputsErrors,
		checkFormValidity,
		restartInputs,
	} = useInputs(
		{
			task: "",
			description: "",
			stage: DefaultSelectValue,
		},
		true
	);

	const { stages } = useContext(StagesCtx);
	const stagesData: IStage[] = useMemo(() => {
		return stages[Number(projectId)];
	}, [projectId, stages]);

	const handleCreateTask = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!checkFormValidity()) return;
		try {
			const TaskFront = new TaskFrontend();
			TaskFront.name = inputsData.task;
			TaskFront.description = inputsData.description;
			TaskFront.stage_id = Number(inputsData.stage);
			const taskCreated = await TaskFront.addTask();
			addTask(Number(inputsData.stage), taskCreated);
			restartInputs("all");
		} catch {}
	};
	return (
		<CreateUpdateTaskContainer>
			<DetailsStyles summary="Crear tarea">
				<Form formTitle="Crear tarea" onSubmit={(e) => e.preventDefault()}>
					<Input
						required
						label="Tarea"
						name="task"
						value={inputsData.task}
						onChange={onChange}
						minLength={3}
						inputInvalid={inputsErrors.task}
					/>
					<Input
						label="Descripcion"
						name="description"
						acceptanceCriteria="(opcional)"
						value={inputsData.description}
						onChange={onChange}
					/>

					<Select
						name="stage"
						label="Estado"
						value={inputsData.stage}
						onChange={onChange}
						defValue={DefaultSelectValue}
						allowDefaultValue={false}
						selectIsInvalid={inputsErrors.stage}
					>
						<option disabled value={DefaultSelectValue}>
							{DefaultSelectValue}
						</option>
						{stagesData?.map((sd) => (
							<option key={`${sd.id}${sd.name}`} value={sd.id}>
								{sd.name}
							</option>
						))}
					</Select>
					<Button
						colorMessage="continue"
						size="large"
						text="Crear tarea"
						disabled={!formIsValid || inputsData.stage === DefaultSelectValue}
						onClick={handleCreateTask}
					/>
				</Form>
			</DetailsStyles>
		</CreateUpdateTaskContainer>
	);
};

const CreateUpdateTaskContainer = styled.div`
	display: grid;
`;

const DetailsStyles = styled(Details)`
	width: 100%;
`;

export default CreateUpdateTask;
