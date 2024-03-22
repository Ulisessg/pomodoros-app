'use client'
import { IProject } from "@/models/project/Project";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import getProjects from "./getProjects";
import { GetProjectsResponse } from "@/app/api/projects/route";

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

  const handleSetProjects = (projectsData: GetProjectsResponse) => {
    setProjects(projectsData.projects)
    setGetProjectsError(projectsData.error)
    setGetProjectsIsLoading(false)
    setUserId(projectsData.userId)
  }

  const addProject = (project: IProject) => {
    setProjects((prev) => [...prev, project])
  }
  
  useEffect(() => {
    void getProjects({
      handleSetProjects,
      isUserLoading: userInfoIsLoading
    })
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