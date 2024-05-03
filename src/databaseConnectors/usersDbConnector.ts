import mariadb from "mariadb";

const usersDbConnector = mariadb.createPool({
	host: process.env.USERS_DB_HOST as string,
	user: process.env.USERS_DB_USER as string,
	password: process.env.USERS_DB_PASSWORD as string,
	database: process.env.USERS_DB_DATABASE as string,
	connectionLimit: 5,
	port: process.env.USERS_DB_PORT as unknown as number,
});

export default usersDbConnector;
