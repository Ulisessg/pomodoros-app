"use client";
import { FC } from "react";
import useProject from "./useProject";
import ListOfStages from "@/components/templates/ListOfStages";
import styled from "styled-components";
import { Title } from "d-system";
import CreateUpdateTask from "@/components/organisms/CreateUpdateTask";

const ProjectDetails: FC = () => {
	const { projectName } = useProject();
	return (
		<ProjectDetailsContainer>
			<Title>Proyecto: {projectName}</Title>
			<CreateUpdateTask />
			<ListOfStages />
		</ProjectDetailsContainer>
	);
};

const ProjectDetailsContainer = styled.div`
	display: grid;
	height: 100%;
	justify-content: center;
`;

export default ProjectDetails;
