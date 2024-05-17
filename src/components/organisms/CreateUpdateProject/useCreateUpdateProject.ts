import { CreateProjectBody } from "@/app/api/projects/POST";
import { ProjectsCtx } from "@/context/ProjectsCtx";
import { StagesCtx } from "@/context/StagesCtx";
import { UserCtx } from "@/context/UserCtx";
import { UseInputsReturn, useInputs } from "d-system";
import { MouseEvent, useContext, useMemo } from "react";

export default function useCreateUpdateProject({
  projectDescription,
  projectName,
}: UseCreateUpdateProjectArgs): UseCreateUpdateProjectReturn {
  const { addStages } = useContext(StagesCtx);

  const { createProject } = useContext(ProjectsCtx);
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
        projectName: projectName || "",
        projectDescription: projectDescription || "",
      },
      true
    );

  const allowCreateUpdateProject = useMemo((): boolean => {
    if (inputsErrors.projectName || inputsData.projectName.length < 3)
      return false;
    if (typeof projectName === "string") {
      const initialDescription = inputsInitialValues.get(
        "description"
      ) as string;
      const currentDescription = inputsData.projectDescription;
      const initialName = inputsInitialValues.get("name") as string;
      const currentName = inputsData.projectName;

      if (
        initialName === currentName &&
        initialDescription !== currentDescription
      )
        return true;
      if (initialName === currentName) return false;
    }
    return true;
  }, [
    inputsData.projectDescription,
    inputsData.projectName,
    inputsErrors.projectName,
    inputsInitialValues,
    projectName,
  ]);

  const createUpdateProject = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (typeof projectName === "string") {
      // Update Project
    } else {
      const projectData: CreateProjectBody = {
        description: inputsData.projectDescription,
        name: inputsData.projectName,
        user_id: userId,
      };
      createProject(projectData, addStages);
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
  extends UseInputsReturn<{ projectName: string; projectDescription: string }> {
  actionMessage: "Actualizar Proyecto" | "Crear proyecto";
  // eslint-disable-next-line no-unused-vars
  createUpdateProject: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  allowCreateUpdateProject: boolean;
}
