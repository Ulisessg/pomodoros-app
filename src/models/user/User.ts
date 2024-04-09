import { Tables } from "@/Types";
import TableValidations from "../TableValidations";

const table: Tables = "users";

export default abstract class User extends TableValidations implements IUser {
	private _user_name: string = "";
	// From supertokens database
	private _user_id: string = "";

	constructor() {
		super(table);
	}

	public get user_id(): string {
		return this._user_id;
	}
	public set user_id(value: string) {
		this.validateUserId(value);
		this._user_id = value;
	}

	public get user_name(): string {
		return this._user_name;
	}
	public set user_name(value: string) {
		this.validateUserName(value);
		this._user_name = value;
	}

	public validateUserId(userId?: string) {
		this.validateName(userId || this.user_id, 100, "user_id");
	}

	public validateUserName(userName?: string) {
		this.validateName(userName || this.user_name, 30, "Username", 3);
	}

	abstract addUser(): Promise<IUser>;
	abstract getUser(): Promise<GetUser>;
}

export type GetUser = IUser | undefined;

export interface IUser {
	user_name: string;
	user_id: string;
}
