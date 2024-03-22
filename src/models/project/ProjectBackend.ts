import mariaDbPool from "@/utils/mariaDbPool";
import Project, { IProject } from "./Project";

const ImplementError = new Error("Implement in backend");

export default class ProjectBackend extends Project {
	constructor() {
		super();
	}
	async addProject(): Promise<any> {
		throw ImplementError;
	}
	async deleteProject(): Promise<any> {
		throw ImplementError;
	}
	async updateProject(): Promise<any> {
		throw ImplementError;
	}
	async getProjects(): Promise<IProject[]> {
		if (!Number.isInteger(this.user_id)) {
			throw new Error("Invalid user_id");
		}
		const connection = await mariaDbPool.getConnection();
		try {
			const projects: IProject[] = await connection.query(
				`SELECT 
		projects.id,
		projects.name,
		projects.description,
		projects.user_id 
		FROM projects INNER JOIN users ON user_id = users.id WHERE users.id = ?;`,
				[this.user_id]
			);
			return projects;
		} catch (error) {
			await connection.end();
			throw error;
		}
	}
}
