import mariadb from "mariadb";

const usersDbConnector = mariadb.createPool({
	host: process.env.USERS_DB_HOST as string,
	user: process.env.USERS_DB_USER as string,
	password: process.env.USERS_DB_PASSWORD as string,
	database: process.env.USERS_DB_DATABASE as string,
	connectionLimit: 5,
});

export default usersDbConnector;
