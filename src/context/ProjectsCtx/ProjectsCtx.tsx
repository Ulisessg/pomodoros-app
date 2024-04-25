"use client";
import { IProject } from "@/models/project/Project";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import ProjectFrontend from "@/models/project/ProjectFrontend";
import { redirectToEditStages } from "@/app/actions";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const initialState: ProjectsCtxState = {
	projects: [],
	getProjectsError: false,
	getProjectsIsLoading: true,
	addProject: () => {},
};

export const ProjectsCtx = createContext<ProjectsCtxState>(initialState);

export const ProjectsCtxProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [projects, setProjects] = useState<IProject[]>(initialState.projects);
	const session = useSessionContext();
	const [getProjectsError, setGetProjectsError] = useState<boolean>(
		initialState.getProjectsError
	);
	const [getProjectsIsLoading, setGetProjectsIsLoading] = useState<boolean>(
		initialState.getProjectsIsLoading
	);

	const addProject = (project: IProject) => {
		redirectToEditStages(project.id);
		setProjects((prev) => [...prev, project]);
	};

	useEffect(() => {
		const getProjects = async () => {
			const Project = new ProjectFrontend();

			if (!session.loading) {
				try {
					const projectsData = await Project.getProjects();
					setProjects(projectsData);
					setGetProjectsError(false);
					setGetProjectsIsLoading(false);
				} catch (error) {
					setGetProjectsError(true);
					setGetProjectsIsLoading(false);
				}
			}
		};
		void getProjects();
	}, [session.loading]);
	return (
		<ProjectsCtx.Provider
			value={{
				projects,
				getProjectsError,
				getProjectsIsLoading,
				addProject,
			}}
		>
			{children}
		</ProjectsCtx.Provider>
	);
};

interface ProjectsCtxState {
	projects: IProject[];
	getProjectsError: boolean;
	getProjectsIsLoading: boolean;
	// eslint-disable-next-line no-unused-vars
	addProject: (project: IProject) => void;
}
