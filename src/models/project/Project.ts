import { Tables } from "@/Types";
import { CreateProjectResponse } from "@/app/api/projects/POST";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "projects";

export default abstract class Project implements IProject {
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
		this.validateUserId(value);
		this._user_id = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this.validateName(value);
		this._name = value;
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this.validateId(value);
		this._id = value;
	}

	public validateName(newName?: string) {
		if (newName) {
			nameValidations({
				maxNameSize: 50,
				name: newName,
				table,
			});
			return;
		}
		nameValidations({
			maxNameSize: 50,
			name: this.name,
			table,
		});
	}
	public validateId(newId?: number) {
		if (newId) {
			idValidations({
				id: newId,
				table,
			});
			return;
		}
		idValidations({
			id: this.id,
			table,
		});
	}
	public validateUserId(newId?: number) {
		if (newId) {
			idValidations({
				id: newId,
				table,
				extraMessage: "user_id",
			});
			return;
		}
		idValidations({
			id: this.user_id,
			table,
			extraMessage: "user_id",
		});
	}

	public abstract addProject(): Promise<CreateProjectResponse>;
	public abstract updateProject(): Promise<any>;
	public abstract deleteProject(): Promise<any>;
	public abstract getProjects(): Promise<IProject[]>;
}

export interface IProject {
	name: string;
	id: number;
	description: string;
	user_id: number;
}
