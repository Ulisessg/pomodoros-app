'use client'
import { IProject } from "@/models/project/Project";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import ProjectFrontend from "@/models/project/ProjectFrontend";
import { redirectToProjectCreated } from "@/app/actions";

const initialState: ProjectsCtxState = {
  projects: [],
  getProjectsError: false,
  getProjectsIsLoading: true,
  userId: NaN,
  addProject: () => {}
}


export const ProjectsCtx = createContext<ProjectsCtxState>(initialState)

export const ProjectsCtxProvider: FC<{children: ReactNode}> = ({children}) => {
  const [projects, setProjects] = useState<IProject[]>(initialState.projects)
  const [getProjectsError, setGetProjectsError] = useState<boolean>(initialState.getProjectsError)
  const [getProjectsIsLoading, setGetProjectsIsLoading] = useState<boolean>(initialState.getProjectsIsLoading)
  const {isLoading: userInfoIsLoading} = useUser()
  const [userId, setUserId] = useState<number>(initialState.userId)

  const addProject = (project: IProject) => {
    setProjects((prev) => [...prev, project])
    redirectToProjectCreated(project.id)
  }
  
  useEffect(() => {
    const getProjects = async () => {
      const Project = new ProjectFrontend();

      if (!userInfoIsLoading) {
        try {
          const projectsData = await Project.getProjects();
          setProjects(projectsData)
          setGetProjectsError(false)
          setGetProjectsIsLoading(false)
          setUserId(Project.user_id)
        } catch (error) {
          setUserId(NaN)
          setGetProjectsError(true)
          setGetProjectsIsLoading(false)
        }
      }
    }
    void getProjects()
  }, [userInfoIsLoading])
  return <ProjectsCtx.Provider value={{
    projects,
    getProjectsError,
    getProjectsIsLoading,
    userId,
    addProject
  }}>
    {children}
  </ProjectsCtx.Provider>
}

interface ProjectsCtxState {
  projects: IProject[]
  getProjectsError: boolean
  getProjectsIsLoading: boolean
  userId: number
  // eslint-disable-next-line no-unused-vars
  addProject: (project: IProject) => void
}