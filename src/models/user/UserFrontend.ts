import User, { GetUser, IUser } from "./User";

export default class UserFrontend extends User {
	addUser(): Promise<IUser> {
		throw new Error("Method not implemented.");
	}
	getUser(): Promise<GetUser> {
		throw new Error("Method not implemented.");
	}
}
