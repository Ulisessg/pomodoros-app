"use client";
import { FC, Fragment, useContext, useEffect, useMemo } from "react";
import { LoadingSpinner, theme } from "d-system";
import styled from "styled-components";
import useGetProjectId from "@/hooks/useGetProjectId";
import LinkProjectSettings from "@/components/atoms/LinkProjectSettings";
import { TaskCtx } from "@/context/TaskCtx";
import { StagesCtx } from "@/context/StagesCtx";
import Stage from "@/components/organisms/Stage";
import { MinScreenWidth } from "@/constants";

const ListOfStages: FC = () => {
	const projectId = useGetProjectId();
	const { tasks: tasksGroupedByStage, getTasks } = useContext(TaskCtx);
	const { stages: StagesGroupedByProject, getStages } = useContext(StagesCtx);
	const stages = useMemo(() => {
		return StagesGroupedByProject[projectId];
	}, [StagesGroupedByProject, projectId]);

	useEffect(() => {
		let firstStageInTasks: string | undefined = undefined;
		let firstProject: string | undefined = undefined;
		for (const stageId in tasksGroupedByStage) {
			firstStageInTasks = stageId;
			break;
		}
		for (const projectId in StagesGroupedByProject) {
			firstProject = projectId;
			break;
		}
		if (typeof firstProject === "undefined") {
			void getStages(projectId);
		}
		if (typeof firstStageInTasks === "undefined") {
			void getTasks(projectId);
		}
	}, [
		StagesGroupedByProject,
		getStages,
		getTasks,
		projectId,
		tasksGroupedByStage,
	]);
	return (
		<ListOfTasksContainer>
			<LinkProjectSettings projectId={projectId} />
			<StagesContainer>
				{stages?.length === 0 && <LoadingSpinner size="small" />}
				{stages?.map((stage) => {
					return (
						<Fragment key={`${stage.id}`}>
							<Stage
								title={stage.name}
								color={stage.color}
								stageId={stage.id}
								projectId={projectId}
							/>
						</Fragment>
					);
				})}
			</StagesContainer>
		</ListOfTasksContainer>
	);
};

const ListOfTasksContainer = styled.div`
	display: grid;
	margin-bottom: ${theme.spacing * 6}px;
	width: 100%;
	justify-content: center;
`;

const StagesGap = theme.spacing * 2;

const StagesContainer = styled.div`
	display: grid;
	gap: ${StagesGap}px;
	grid-template-columns: 1fr;
	@media screen and (min-width: ${MinScreenWidth.tablet}px) {
		grid-template-columns: 1fr 1fr;
	}
	@media screen and (min-width: ${MinScreenWidth.desktop}px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export default ListOfStages;
