"use client";
import { FC, Fragment, useContext, useEffect, useMemo } from "react";
import { LoadingSpinner } from "d-system";
import useGetProjectId from "@/hooks/useGetProjectId";
import LinkProjectSettings from "@/components/atoms/LinkProjectSettings";
import { TaskCtx } from "@/context/TaskCtx";
import { StagesCtx } from "@/context/StagesCtx";
import Stage, {
	ListOfStagesContainer,
	StagesContainer,
} from "@/components/organisms/Stage";

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
		<ListOfStagesContainer>
			{(stages?.length === 0 || typeof stages === "undefined") && (
				<LoadingSpinner size="large" />
			)}
			{stages?.length > 0 && (
				<>
					<LinkProjectSettings projectId={projectId} />
					<StagesContainer>
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
				</>
			)}
		</ListOfStagesContainer>
	);
};

export default ListOfStages;
