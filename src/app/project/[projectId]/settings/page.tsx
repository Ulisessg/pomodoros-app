"use client";
import { Link, Title, theme } from "d-system";
import { usePathname } from "next/navigation";
import React from "react";
import styled, { keyframes } from "styled-components";

const ProjectSettings = () => {
	const path = usePathname();
	return (
		<ProjectSettingsStyles>
			<Title>Configuracion del proyecto.</Title>
			<EditStagesLink
				href={`${path}/edit-stages`}
				text="Editar flujo de trabajo"
			/>
		</ProjectSettingsStyles>
	);
};

const ProjectSettingsStyles = styled.div`
	display: grid;
	width: 100%;
`;

const ChangeBackground = keyframes`
	from {
		background-color: white;	
	}
	to {
		background-color: ${theme.colors.light1};
	}
`;

const EditStagesLink = styled(Link)`
	width: 100%;
	border: 1px solid ${theme.colors.light1};
	padding: ${theme.spacing * 3}px;
	border-radius: ${theme.spacing}px;
	&:hover,
	&:focus {
		animation: ${ChangeBackground} 0.5s;
		animation-fill-mode: forwards;
	}
`;

export default ProjectSettings;
