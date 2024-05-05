"use client";
import { FC } from "react";
import useProject from "./useProject";
import ListOfStages from "@/components/templates/ListOfStages";
import styled from "styled-components";
import { Title } from "d-system";
import CreateUpdateTask from "@/components/organisms/CreateUpdateTask";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const ProjectDetails: FC = () => {
	const { projectName } = useProject();
	return (
		<SessionAuth>
			<ProjectDetailsContainer>
				<Title>Proyecto: {projectName}</Title>
				<CreateUpdateTask stageId={NaN} />
				<ListOfStages />
			</ProjectDetailsContainer>
		</SessionAuth>
	);
};

const ProjectDetailsContainer = styled.div`
	display: grid;
	height: 100%;
	justify-content: center;
	justify-items: center;
`;

export default ProjectDetails;
