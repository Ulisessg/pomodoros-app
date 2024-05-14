import { FC, useContext, useMemo } from "react";
import H2 from "../atoms/H2";
import ListOfProjects from "../organisms/ListOfProjects";
import styled from "styled-components";
import { ProjectsCtx } from "@/context/ProjectsCtx";
import { LoadingSpinner, Title, theme } from "d-system";
import CreateUpdateProject from "../organisms/CreateUpdateProject";
import { UserCtx } from "@/context/UserCtx";

const ShowProjects: FC = () => {
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
        <H2>Selecciona un proyecto</H2>
        <ListOfProjects />
        <h3>O si lo prefieres crea otro proyecto</h3>
        <CreateUpdateProject />
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
      <ShowProjects />
    </ShowProjectsContainer>
  );
};

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
