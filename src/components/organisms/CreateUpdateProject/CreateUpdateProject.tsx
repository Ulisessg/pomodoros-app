import {
  AcceptanceCriteria,
  Button,
  Form,
  Input,
  LoadingSpinner,
  theme,
} from "d-system";
import { FC, use } from "react";
import styled from "styled-components";
import useCreateUpdateProject from "./useCreateUpdateProject";
import { ProjectsCtx } from "@/context/ProjectsCtx";

const CreateUpdateProject: FC<CreateUpdateProjectProps> = ({
  projectDescription,
  projectName,
}) => {
  const { createProjectStatus } = use(ProjectsCtx);
  const {
    actionMessage,
    onChange,
    onBlur,
    inputsErrors,
    inputsData,
    allowCreateUpdateProject,
    createUpdateProject,
  } = useCreateUpdateProject({
    projectDescription,
    projectName,
  });
  return (
    <CreateUpdateProjectContainer>
      <Form formTitle={actionMessage} onSubmit={(e) => e.preventDefault}>
        <Input
          required
          label="Nombre del proyecto"
          name="projectName"
          maxLength={50}
          minLength={3}
          onChange={onChange}
          onBlur={onBlur}
          inputInvalid={inputsErrors.projectName}
          value={inputsData.projectName}
        />
        <Input
          name="projectDescription"
          label="Descripcion"
          acceptanceCriteria="(Opcional)"
          onChange={onChange}
          onBlur={onBlur}
          value={inputsData.projectDescription}
        />
        <Button
          colorMessage="continue"
          size="large"
          text={actionMessage}
          disabled={!allowCreateUpdateProject}
          onClick={createUpdateProject}
          data-button-create-project
        />
        {createProjectStatus === "pending" && (
          <LoadingSpinnerContainer>
            <LoadingSpinner size="small" />
          </LoadingSpinnerContainer>
        )}
        <AcceptanceCriteria
          error={true}
          show={createProjectStatus === "error"}
          text="Ocurrió un error creando el proyecto, intenta de nuevo más tarde"
        />

        {createProjectStatus === "fulfilled" && (
          <LoadingSpinnerContainer>
            <LoadingSpinner size="small" />
          </LoadingSpinnerContainer>
        )}
      </Form>
    </CreateUpdateProjectContainer>
  );
};

const CreateUpdateProjectContainer = styled.div`
  width: 100%;
`;

const LoadingSpinnerContainer = styled.div`
  margin-top: ${theme.spacing * 5}px;
  display: grid;
  width: 100%;
  justify-items: center;
`;

interface CreateUpdateProjectProps {
  projectName?: string;
  projectDescription?: string;
}

export default CreateUpdateProject;
