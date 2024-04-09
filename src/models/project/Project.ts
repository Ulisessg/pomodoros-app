import { Tables } from "@/Types";
import TableValidations from "../TableValidations";

const table: Tables = "projects";

export default abstract class Project
	extends TableValidations
	implements IProject
{
	private _description: string = "";
	private _user_id: string = "";
	private _id: number = NaN;
	private _name: string = "";

	constructor() {
		super(table);
	}

	public get description(): string {
		return this._description;
	}
	public set description(value: string) {
		if (typeof value !== "string") {
			throw new TypeError("Description must be string type, even is empty");
		}
		this._description = value;
	}
	public get user_id(): string {
		return this._user_id;
	}
	public set user_id(value: string) {
		this.validateUserId(value);
		this._user_id = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this.validateProjectName(value);
		this._name = value;
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this.validateProjectId(value);
		this._id = value;
	}

	public validateProjectName(newName?: string) {
		this.validateName(newName || this.name, 50, "Project name", 3);
	}
	public validateProjectId(newId?: number) {
		this.validateId(newId || this.id, "Project Id");
	}
	public validateUserId(newId?: string) {
		this.validateName(newId || this.user_id, 50, "User Id");
	}
	public abstract updateProject(): Promise<any>;
	public abstract deleteProject(): Promise<any>;
	public abstract getProjects(): Promise<IProject[]>;
}

export interface IProject {
	name: string;
	id: number;
	description: string;
	// Supertokens user_id
	user_id: string;
}
