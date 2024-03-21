import mariaDbPool from "@/utils/mariaDbPool";
import User, { GetUser, IUser } from "./User";
import UserError from "./UserError";

export default class UserBackend extends User {
	constructor() {
		super();
	}
	async getUser(): Promise<GetUser> {
		this.validateUserName();
		const connection = await mariaDbPool.getConnection();
		try {
			const user: [IUser] = await connection.query(
				`SELECT
		users.id,
		users.username AS name
		FROM users
		WHERE users.username = ?`,
				[this.name]
			);
			connection.end();
			return user[0];
		} catch (error) {
			connection.end();
			throw error;
		}
	}
	async addUser(): Promise<IUser> {
		this.validateUserName();
		const connection = await mariaDbPool.getConnection();
		try {
			const user: [IUser] = await connection.query(
				`INSERT INTO users (id, username) VALUES (?, ?) RETURNING id, username`,
				[null, this.name]
			);
			connection.end();
			return user[0];
		} catch (error) {
			connection.end();
			throw new UserError("Error creating user", {
				cause: error,
			});
		}
	}
}
