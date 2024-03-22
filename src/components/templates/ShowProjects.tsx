import { FC, useContext, useMemo } from "react";
import H2 from "../atoms/H2";
import ListOfProjects from "../organisms/ListOfProjects";
import styled from "styled-components";
import { ProjectsCtx } from "@/context/ProjectsCtx";
import { LoadingSpinner } from "d-system";
import CreateUpdateProject from "../organisms/CreateUpdateProject";

const ShowProjects: FC = () => {
  const {getProjectsIsLoading, projects} = useContext(ProjectsCtx)
  const getShowProjectsFormOrSpinner = useMemo((): 'projects' | 'form' | 'spinner' => {
    if(!getProjectsIsLoading) {
      if(projects.length === 0) {
        return 'form'
      }
      return 'projects'
    }
    return 'spinner'
  }, [getProjectsIsLoading, projects])

  if(getShowProjectsFormOrSpinner === 'spinner') return <>
    <LoadingSpinnerContainer>
      <LoadingSpinner size="small" />
    </LoadingSpinnerContainer>
  </>
  if(getShowProjectsFormOrSpinner === 'projects') return <>
    <H2>Selecciona un proyecto</H2>
    <ListOfProjects />
  </>

  return <CreateUpdateProject />
  
}

const ShowProjectsWrapper: FC = () => {
  return <ShowProjectsContainer>
    <ShowProjects />
  </ShowProjectsContainer>
}

const ShowProjectsContainer = styled.div`
  width: 100%;
`

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default ShowProjectsWrapper
