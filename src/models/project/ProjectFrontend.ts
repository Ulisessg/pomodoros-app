"use client";
import { GetProjectsResponse } from "@/app/api/projects/route";
import Project, { IProject } from "./Project";
import { CreateProjectResponse } from "@/app/api/projects/POST";
import axiosInstance from "@/utils/axiosInstance";

const ImplementError = new Error("Implement in frontend");

export default class ProjectFrontend extends Project {
	constructor() {
		super();
	}
	async addProject(): Promise<CreateProjectResponse> {
		this.validateProjectName();

		const addProjectResult = await axiosInstance.post<CreateProjectResponse>(
			"/projects",
			{
				name: this.name,
				description: this.description,
				user_id: this.user_id,
			}
		);
		return addProjectResult.data;
	}

	override async deleteProject(): Promise<any> {
		throw ImplementError;
	}
	override async updateProject(): Promise<any> {
		throw ImplementError;
	}
	async getProjects(): Promise<IProject[]> {
		try {
			const req = await axiosInstance.get<GetProjectsResponse>("/projects");
			const projectsResponse = req.data;
			if (projectsResponse.error) {
				throw new Error("Error getting projects");
			}
			return projectsResponse.projects;
		} catch (error) {
			throw error;
		}
	}
}
