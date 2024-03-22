import { ProjectsCtx } from "@/context/ProjectsCtx";
import { FC, Fragment, useContext } from "react";
import Project from "../molecules/Project";
import styled from "styled-components";

const ListOfProjects: FC = () => {
  const { projects } = useContext(ProjectsCtx)
  
  return <ListOfProjectsContainer>
    {projects.map((proj) => <Fragment key={proj.id}>
      <Project 
        project={proj}
      />
    </Fragment>)}
  </ListOfProjectsContainer>
}

const ListOfProjectsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  gap: 20px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`

export default ListOfProjects