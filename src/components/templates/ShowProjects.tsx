import { FC, use, useContext, useMemo } from "react";
import H2 from "../atoms/H2";
import ListOfProjects from "../organisms/ListOfProjects";
import styled from "styled-components";
import { ProjectsCtx } from "@/context/ProjectsCtx";
import { Button, LoadingSpinner, Title, theme } from "d-system";
import CreateUpdateProject from "../organisms/CreateUpdateProject";
import { UserCtx } from "@/context/UserCtx";
import { Modal, ModalCtx, ModalProvider } from "@/context/ModalCtx";

const ShowProjects: FC = () => {
  const { openModal } = use(ModalCtx);
  const { userInfoIsLoading, userName } = useContext(UserCtx);
  const { getProjectsStatus, projects } = useContext(ProjectsCtx);

  const whatToShow = useMemo((): "projects" | "form" | "spinner" | "error" => {
    if (getProjectsStatus === "pending" || getProjectsStatus === "none")
      return "spinner";
    if (getProjectsStatus === "error") return "error";
    if (getProjectsStatus === "fulfilled") {
      if (projects.length === 0) {
        return "form";
      }
      return "projects";
    }
    throw new RangeError("Get Project Status invalid");
  }, [getProjectsStatus, projects]);

  if (whatToShow === "error") {
    return <h1>Error obteniendo los proyectos, intenta de nuevo más tarde</h1>;
  }
  if (whatToShow === "spinner" || userInfoIsLoading)
    return (
      <>
        <LoadingSpinnerContainer data-loading-spinner>
          <LoadingSpinner size="large" />
        </LoadingSpinnerContainer>
      </>
    );

  if (whatToShow === "projects")
    return (
      <>
        <Modal ariaText="Crear proyecto">
          <CreateUpdateProject />
        </Modal>
        <CreateProjectButton
          colorMessage="continue"
          size="small"
          text="Crear proyecto"
          onClick={openModal}
          data-open-create-project-button
        />
        <H2>Proyectos</H2>
        <ListOfProjects />
      </>
    );

  return (
    <>
      <Title>Hola {userName}! Comienza creando un proyecto</Title>

      <CreateUpdateProject />
    </>
  );
};

const ShowProjectsWrapper: FC = () => {
  return (
    <ShowProjectsContainer>
      <ModalProvider>
        <ShowProjects />
      </ModalProvider>
    </ShowProjectsContainer>
  );
};

const CreateProjectButton = styled(Button)`
  justify-self: end;
`;

const ShowProjectsContainer = styled.div`
  display: grid;
  width: 100%;
  margin-top: ${theme.spacing * 3}px;
  gap: ${theme.spacing * 8}px;
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default ShowProjectsWrapper;
