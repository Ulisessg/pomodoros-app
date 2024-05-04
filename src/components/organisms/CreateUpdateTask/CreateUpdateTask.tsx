"use client";
import { DefaultSelectValue } from "@/constants";
import { StagesCtx } from "@/context/StagesCtx";
import { IStage } from "@/models/stage/Stage";
import { Button, Details, Form, Input, Select } from "d-system";
import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import useCreateUpdateTask from "./useCreateUpdateTask";
import TaskDescription from "@/components/molecules/TaskDescription";

const CreateUpdateTask: FC<Props> = ({ projectId }) => {
	const { stages } = useContext(StagesCtx);
	const stagesData: IStage[] = useMemo(() => {
		return stages[Number(projectId)];
	}, [projectId, stages]);
	const {
		inputsData,
		inputsErrors,
		onChange,
		formIsValid,
		handleCreateTask,
		resetTaskDescription,
	} = useCreateUpdateTask();

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
					<TaskDescription
						editor
						controls={false}
						resetValue={resetTaskDescription}
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

interface Props {
	projectId: number;
}

export default CreateUpdateTask;
