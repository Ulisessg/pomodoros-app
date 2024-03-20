import { Tables } from "@/Types";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "users";

export default class User implements IUser {
	private _id: number = NaN;
	private _name: string = "";

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

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		nameValidations({
			maxNameSize: 30,
			name: value,
			table,
		});
		this._name = value;
	}
	async addUser(): Promise<void> {
		throw new Error("Implement in frontend or backend");
	}
}

interface IUser {
	id: number;
	name: string;
	addUser: () => void;
}
