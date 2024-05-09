"use client";
import { IProject } from "@/models/project/Project";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import ProjectFrontend from "@/models/project/ProjectFrontend";
import { redirectToEditStages } from "@/app/actions";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import useRequest, { Status } from "@/hooks/useRequest";
import { CreateProjectBody } from "@/app/api/projects/POST";
import { StagesState } from "../StagesCtx/StagesCtx";
import { redirectToAuth } from "supertokens-auth-react";

const initialState: State = {
  projects: [],
  createProjectStatus: "none",
  getProjectsStatus: "none",
  createProject: async () => {},
};

export const ProjectsCtx = createContext<State>(initialState);

export const ProjectsCtxProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    status: createProjectStatus,
    updateStatus: setCreateProjectStatus,
    restartStatus: restartCreateProjectStatus,
  } = useRequest();
  const { status: getProjectsStatus, updateStatus: setGetProjectsStatus } =
    useRequest();
  const [projects, setProjects] = useState<IProject[]>(initialState.projects);
  const session = useSessionContext();

  const createProject: State["createProject"] = async (project, addStages) => {
    try {
      setCreateProjectStatus("pending");
      const Project = new ProjectFrontend();
      Project.name = project.name;
      Project.description = project.description;
      Project.user_id = project.user_id;
      const projectAndStagesData = await Project.addProject();

      redirectToEditStages(projectAndStagesData.project.id);

      setProjects((prev) => [...prev, projectAndStagesData.project]);
      addStages(projectAndStagesData.project.id, projectAndStagesData.stages);
      setCreateProjectStatus("fulfilled");
      await restartCreateProjectStatus();
    } catch (error) {
      setCreateProjectStatus("error");
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      setGetProjectsStatus("pending");

      if (!session.loading) {
        if (session.doesSessionExist) {
          try {
            const Project = new ProjectFrontend();
            const projectsData = await Project.getProjects();
            setProjects(projectsData);
            setGetProjectsStatus("fulfilled");
          } catch (error) {
            setGetProjectsStatus("error");
          }
        } else {
          await redirectToAuth();
        }
      }
    };
    void getProjects();
  }, [session, setGetProjectsStatus]);
  return (
    <ProjectsCtx.Provider
      value={{
        projects,
        createProjectStatus,
        getProjectsStatus,
        createProject,
      }}
    >
      {children}
    </ProjectsCtx.Provider>
  );
};

interface State {
  projects: IProject[];
  createProjectStatus: Status;
  getProjectsStatus: Status;
  createProject: (
    // eslint-disable-next-line no-unused-vars
    project: CreateProjectBody,
    // eslint-disable-next-line no-unused-vars
    addStages: StagesState["addStages"]
  ) => Promise<void>;
}
