import { IProject } from "@/models/project/Project";
import GET from "./GET";
import POST from "./POST";
import { IStage } from "@/models/stage/Stage";

export { GET, POST };

export interface GetProjectsResponse {
	error: boolean;
	projects: IProject[];
	userId: number;
}

export interface CreateProjectResponse {
	error: boolean;
	project: IProject;
	stages: IStage[];
}
