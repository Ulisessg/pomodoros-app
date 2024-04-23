import mariaDbPool from "@/databaseConnectors/mariaDbPool";
import Project, { IProject } from "./Project";

const ImplementError = new Error("Implement in backend");

export default class ProjectBackend extends Project {
	constructor() {
		super();
	}
	async addProject(): Promise<IProject> {
		const connection = await mariaDbPool.getConnection();
		try {
			this.validateUserId();
			this.validateProjectName();
			const projectWithSameName = await connection.query(
				"SELECT * FROM projects WHERE projects.name = ? AND projects.user_id = ?",
				[this.name, this.user_id]
			);
			if (projectWithSameName.length > 0) {
				throw new Error("Project exists");
			}
			const projectCreated: [IProject] = await connection.query(
				`INSERT INTO projects 
				(id, name, description, user_id) 
				VALUES 
				(?, ?, ?, ?) RETURNING id, name, description, user_id`,
				[null, this.name, this.description, this.user_id]
			);
			return projectCreated[0];
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	async deleteProject(): Promise<any> {
		throw ImplementError;
	}
	async updateProject(): Promise<any> {
		throw ImplementError;
	}
	async getProjects(): Promise<IProject[]> {
		this.validateUserId();
		const connection = await mariaDbPool.getConnection();
		try {
			const projects: IProject[] = await connection.query(
				`SELECT 
		projects.id,
		projects.name,
		projects.description,
		projects.user_id 
		FROM projects INNER JOIN users ON projects.user_id = users.user_id WHERE users.user_id = ?`,
				[this.user_id]
			);
			return projects;
		} catch (error) {
			await connection.end();
			throw error;
		} finally {
			await connection.end();
		}
	}
	async validateProjectBelongsToUser(userId: string, projectId: number) {
		this.validateId(projectId, "param project_id");
		this.validateName(userId, 50, "param user_id", 35);
		const connection = await mariaDbPool.getConnection();
		try {
			const project: [IProject] = await connection.query(
				"SELECT * FROM projects WHERE project_id = ? AND user_id = ?",
				[projectId, userId]
			);
			if (typeof project[0] === "undefined") {
				throw new Error(errorMessages.projectNoBelongsToUser);
			}
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
}

export const errorMessages = {
	projectNoBelongsToUser: "projectNoBelongsToUser",
};
