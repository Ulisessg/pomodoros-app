import { IProject } from "@/models/project/Project";
import GET from "./GET";
import POST from "./POST";

export { GET, POST };

export interface GetProjectsResponse {
	error: boolean;
	projects: IProject[];
	userId: number;
}
