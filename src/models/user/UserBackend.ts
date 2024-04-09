import mariaDbPool from "@/databaseConnectors/mariaDbPool";
import User, { IUser } from "./User";
import UserError from "./UserError";
import usersDbConnector from "@/databaseConnectors/usersDbConnector";

export default class UserBackend extends User {
	constructor() {
		super();
	}
	// From users database
	async getUser(): Promise<IUser> {
		const connection = await usersDbConnector.getConnection();
		try {
			this.validateUserId();
			const userFromDbUsers: [IUser] = await connection.query(
				"SELECT user_name, user_id FROM users WHERE users.user_id = ?",
				[this.user_id]
			);
			return userFromDbUsers[0];
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}

	// Add user in pomodorosDb
	async addUser(): Promise<IUser> {
		const connection = await mariaDbPool.getConnection();
		try {
			this.validateUserName();
			this.validateUserId();

			const user: [IUser] = await connection.query(
				`INSERT INTO users (id, user_name, user_id) VALUES (?, ?, ?) RETURNING id, user_name, user_id`,
				[null, this.user_name, this.user_id]
			);

			return user[0];
		} catch (error) {
			throw new UserError("Error creating user", {
				cause: error,
			});
		} finally {
			await connection.end();
		}
	}
	public async validateUserIsRegisteredInPomodorosDb(): Promise<boolean> {
		this.validateUserId();
		const connection = await mariaDbPool.getConnection();
		try {
			const user: [IUser] = await connection.query(
				`SELECT * FROM users WHERE users.user_id = ?`,
				[this.user_id]
			);

			if (typeof user[0] !== "undefined") {
				return true;
			}
			return false;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
}
