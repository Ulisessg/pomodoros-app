import { Tables } from "@/Types";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "projects";
const ImplementError = new Error("Implement in frontend or backend");

export default class Project implements IProject {
	private _description: string = "";
	private _user_id: number = NaN;
	private _id: number = NaN;
	private _name: string = "";

	public get description(): string {
		return this._description;
	}
	public set description(value: string) {
		if (typeof value !== "string") {
			throw new TypeError("Description must be string type, even is empty");
		}
		this._description = value;
	}
	public get user_id(): number {
		return this._user_id;
	}
	public set user_id(value: number) {
		idValidations({
			id: value,
			table,
			extraMessage: "user_id",
		});
		this._user_id = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		nameValidations({
			maxNameSize: 50,
			name: value,
			table,
		});
		this._name = value;
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		idValidations({
			id: value,
			table,
		});
		this._id = value;
	}
	public async addProject(): Promise<any> {
		throw ImplementError;
	}
	public async updateProject(): Promise<any> {
		throw ImplementError;
	}
	public async deleteProject(): Promise<any> {
		throw ImplementError;
	}
	public async getProjects(): Promise<Array<IProject>> {
		throw ImplementError;
	}
}

const x = new Project();
export interface IProject {
	name: string;
	id: number;
	description: string;
	user_id: number;
}
