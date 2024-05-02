"use client";
import { theme } from "d-system";
import React from "react";
import styled from "styled-components";
import EditListOfStages from "@/components/templates/EditListOfStages";

const EditStages = () => {
	return (
		<EditStagesContainer>
			<h1>Edita el flujo de trabajo de este proyecto</h1>
			<p>
				Puedes cambiar el orden de los stages arrastrandolos o puedes cambiarles
				el nombre
			</p>
			<p>
				Los stages con tareas asociadas no se pueden eliminar, solo pueden
				cambiar de nombre
			</p>
			<EditListOfStages />
		</EditStagesContainer>
	);
};

const EditStagesContainer = styled.div`
	display: grid;
	margin: ${theme.spacing * 3}px;
`;

export default EditStages;
