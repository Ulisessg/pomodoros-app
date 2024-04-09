import { ProjectsCtx } from "@/context/ProjectsCtx";
import { StagesCtx } from "@/context/StagesCtx";
import { UserCtx } from "@/context/UserCtx";
import ProjectFrontend from "@/models/project/ProjectFrontend";
import { UseInputsReturn, useInputs } from "d-system";
import { MouseEvent, useContext, useMemo } from "react";

export default function useCreateUpdateProject({
	projectDescription,
	projectName,
}: UseCreateUpdateProjectArgs): UseCreateUpdateProjectReturn {
	const { addStages } = useContext(StagesCtx);

	const { addProject } = useContext(ProjectsCtx);
	const { userId } = useContext(UserCtx);

	const actionMessage = useMemo(() => {
		if (typeof projectName === "string") {
			return "Actualizar Proyecto";
		}
		return "Crear proyecto";
	}, [projectName]);
	const { inputsData, inputsErrors, inputsInitialValues, ...UseInputsRest } =
		useInputs(
			{
				name: projectName || "",
				description: projectDescription || "",
			},
			true
		);

	const allowCreateUpdateProject = useMemo((): boolean => {
		if (inputsErrors.name || inputsData.name.length < 3) return false;
		if (typeof projectName === "string") {
			const initialDescription = inputsInitialValues.get(
				"description"
			) as string;
			const currentDescription = inputsData.description;
			const initialName = inputsInitialValues.get("name") as string;
			const currentName = inputsData.name;

			if (
				initialName === currentName &&
				initialDescription !== currentDescription
			)
				return true;
			if (initialName === currentName) return false;
		}
		return true;
	}, [
		inputsData.description,
		inputsData.name,
		inputsErrors.name,
		inputsInitialValues,
		projectName,
	]);

	const createUpdateProject = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const Project = new ProjectFrontend();
		Project.name = inputsData.name;
		Project.description = inputsData.description;
		Project.user_id = userId;
		if (typeof projectName === "string") {
			Project.updateProject();
		} else {
			const projectAndStagesData = await Project.addProject();
			addStages(projectAndStagesData.project.id, projectAndStagesData.stages);
			addProject({ ...projectAndStagesData.project });
		}
	};

	return {
		inputsData,
		inputsErrors,
		inputsInitialValues,
		...UseInputsRest,
		actionMessage,
		allowCreateUpdateProject,
		createUpdateProject,
	};
}

interface UseCreateUpdateProjectArgs {
	projectName?: string;
	projectDescription?: string;
}

interface UseCreateUpdateProjectReturn
	extends UseInputsReturn<{ name: string; description: string }> {
	actionMessage: "Actualizar Proyecto" | "Crear proyecto";
	// eslint-disable-next-line no-unused-vars
	createUpdateProject: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
	allowCreateUpdateProject: boolean;
}
