import User from "./User";

export default class UserFrontend extends User {
	getUser(): Promise<string> {
		throw new Error("Method not implemented.");
	}
	override async addUser(): Promise<void> {
		throw new Error("Implement Add user frontend");
	}
}
