import { IProject } from "@/models/project/Project";
import ProjectFrontend from "@/models/project/ProjectFrontend";

const Project = new ProjectFrontend();

export default async function getProjects({
	isUserLoading,
	handleSetProjects,
}: GetProjectsArgs) {
	if (!isUserLoading) {
		try {
			const projectsData = await Project.getProjects();
			handleSetProjects({
				projects: projectsData,
				userId: Project.user_id,
			});
		} catch (error) {
			handleSetProjects({
				projects: [],
				userId: NaN,
			});
		}
	}
}

interface GetProjectsArgs {
	isUserLoading: boolean;
	handleSetProjects: (
		// eslint-disable-next-line no-unused-vars
		projectsData: {
			projects: IProject[];
			userId: number;
		}
	) => void;
}
