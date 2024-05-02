"use client";
import React, { DragEvent, FC, Fragment, use, useId, useMemo } from "react";
import {
	StageProps,
	StageTitleStyles,
	StageContainerStyles,
	TasksContainer,
} from "./Stage";
import Task from "./Task";
import styled from "styled-components";
import { useInputs, Input, InputBlurEvent, TrashCan, theme } from "d-system";
import { TaskCtx } from "@/context/TaskCtx";
import { StagesCtx } from "@/context/StagesCtx";
import useGetProjectId from "@/hooks/useGetProjectId";

const StageExample: FC<Props> = ({
	title,
	stageId,
	stageIndex,
	handleOnDrop,
	updateStageName,
	removeLocalStage,
}) => {
	const fakeProjectId = useId();
	const projectId = useGetProjectId();
	const { deleteStage } = use(StagesCtx);
	const { tasks: tasksGroupedByStage } = use(TaskCtx);
	const stageHaveAssociatedTasks: boolean = useMemo(() => {
		const tasksQty = tasksGroupedByStage[Number(stageId)];

		if (typeof tasksQty === "undefined") {
			// Then tasks are requested
			return false;
		}

		// Stage Id === null when is a new stage
		if (tasksQty.length === 0 || stageId === null) {
			return false;
		}
		return true;
	}, [stageId, tasksGroupedByStage]);

	const { inputsData, onChange, onBlur } = useInputs(
		{
			stage_title: title,
		},
		false
	);

	const tasks = [
		{
			day_id: 1,
			description: "",
			id: 13213,
			name: "Example task",
			stage_id: stageId,
			start_date: "",
		},
	];
	const handleOnDragStart = (e: DragEvent<HTMLDivElement>) => {
		(e.target as HTMLDivElement).style.opacity = "0.4";
		const format = "text/plain";
		const data: StageExampleDragEventData = {
			stageIndex,
		};
		e.dataTransfer.setData(format, JSON.stringify(data));
	};

	const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleOnBlur = (ev: InputBlurEvent) => {
		onBlur(ev);
		// Update on blur to avoid excessive updates of all stages
		updateStageName(stageIndex, inputsData.stage_title);
	};

	const handleDeleteStage = async () => {
		if (Number.isInteger(stageId)) {
			await deleteStage(stageId, stageIndex, projectId);
		} else {
			removeLocalStage(stageIndex);
		}
	};

	return (
		<StageExampleStyles
			onDragStart={handleOnDragStart}
			onDragOver={handleOnDragOver}
			onDrop={handleOnDrop}
			draggable
			data-stage-index={stageIndex}
		>
			<StageContainerFormStyles>
				<StageTitleContainer>
					<StageTitleFormStyles
						value={inputsData.stage_title}
						onChange={onChange}
						name="stage_title"
						label={null as any}
						labelProps={{
							"aria-label": "Nombre del stage",
						}}
						onBlur={handleOnBlur}
						data-edit-stage-name
					/>
				</StageTitleContainer>
				<TasksContainer>
					{tasks.map((task, index) => {
						return (
							<Fragment key={`${stageId}${task.id}`}>
								<Task
									task={task}
									taskIndex={index}
									projectId={fakeProjectId as unknown as number}
									isExampleTask={true}
								/>
							</Fragment>
						);
					})}
					{!stageHaveAssociatedTasks && (
						<TrashCanContainer>
							<TrashCanStyles
								height={40}
								width={40}
								title="Eliminar Stage"
								type="button"
								onClick={handleDeleteStage}
							/>
						</TrashCanContainer>
					)}
				</TasksContainer>
			</StageContainerFormStyles>
		</StageExampleStyles>
	);
};

const StageContainerFormStyles = styled.form`
	${StageContainerStyles}
`;

const StageTitleContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	label {
		margin: 0;
	}
`;

const StageTitleFormStyles = styled(Input)`
	${StageTitleStyles}
	border: none;
	border-radius: 0px;
	&:valid {
		border: none;
	}
	margin: 0;
`;

const StageExampleStyles = styled.div`
	cursor: grab;
`;

const TrashCanContainer = styled.div`
	display: grid;
	height: ${theme.spacing * 29.5}px;
	justify-content: right;
	align-content: end;
`;

const TrashCanStyles = styled(TrashCan)`
	margin-right: ${theme.spacing}px;
`;

interface Props extends StageProps {
	// Stages are ordered so index indicates stage_order
	stageIndex: number;
	// eslint-disable-next-line no-unused-vars
	handleOnDrop: (e: DragEvent) => void;
	/**
	 * Update stage name in parent element
	 * @param index
	 * @param newName
	 * @returns
	 */
	updateStageName: (
		// eslint-disable-next-line no-unused-vars
		index: number,
		// eslint-disable-next-line no-unused-vars
		newName: string
	) => void;
	// eslint-disable-next-line no-unused-vars
	removeLocalStage: (stageIndex: number) => void;
}

export interface StageExampleDragEventData {
	stageIndex: number;
}

export default StageExample;
